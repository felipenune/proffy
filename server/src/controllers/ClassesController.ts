import { Request, Response } from 'express'
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface Sch {
  week_day: number,
  from: string,
  to: string
}

export default class ClassesControler {
  async index(request: Request, response: Response) {
    const filters = request.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHoursToMinutes(time)

    const classes = await db('classes')
    .whereExists(function() {
      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('class_schedule.class_id = classes.id')
        .whereRaw('class_schedule.week_day = ?', [Number(week_day)])
        .whereRaw('class_schedule.from <= ?', [timeInMinutes])
        .whereRaw('class_schedule.to > ?', [timeInMinutes])
    })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    response.json(classes)
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whats,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction()
  
    try {
      const insertedUserIds = await trx('users').insert({
        name,
        avatar,
        whats,
        bio
      }).returning("id")
    
      const user_id = insertedUserIds[0]
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      }).returning("id")
    
      const class_id = insertedClassesIds[0]
    
      const classSchedule = schedule.map((sch: Sch) => {
        return {
          class_id,
          week_day: sch.week_day,
          from: convertHoursToMinutes(sch.from),
          to: convertHoursToMinutes(sch.to)
        }
      })
    
      await trx('class_schedule').insert(classSchedule)
    
      await trx.commit()
    
      return response.status(201).send();
    } catch (err) {
      await trx.rollback()
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}
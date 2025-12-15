import prisma from '../config/prismaClient';
import AgendaData from '../types/AgendaData';

export class Schedule {
    async CreateSchedule( data: AgendaData) {
        const {scope, time, date, duration, location} = data;

    if (!scope || !time || !date || !duration || !location){
        throw new Error("Todas as informações devem ser fornecidas.");
        }

    if (date < new Date()){
        throw new Error("A data não pode ser menor do que hoje.");
    }

    const schedule = {
        id: Math.floor(Math.random() * 1000),
        scope,
        time,
        date,
        duration,
        location,
        createdAt: new Date()
    };

    return schedule;
    }
}
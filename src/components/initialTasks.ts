import { useState } from "react";
import { Task } from "../types/taskType";

export const initialTasks : Task[] = [
    {
        id: 1,
        description: 'Clean room',
        startDate: new Date(Date.now()),
        endDate: new Date('2021-05-20')

    },
    {
        id: 2,
        description: 'Walk the dog',
        startDate: new Date(Date.now()),
        endDate: new Date('2020-12-05')
    }];
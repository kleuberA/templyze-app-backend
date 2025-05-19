import { Controller, Get, Param, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @ApiBearerAuth()
    @Get('/all-tasks-by-id/:userid')
    async getAllTasksByUserId(@Param('id') userID: string, @Res() resp: Response) {
        try {
            const tasks = await this.taskService.getAllTasksByUserId(userID);
            return resp.status(200).json({ message: "Tasks fetched successfully!", tasks });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to fetch tasks!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Get('/task-by-id/:taskid')
    async getTaskById(@Param('taskid') taskID: string, @Res() resp: Response) {
        try {
            const task = await this.taskService.getTaskById(taskID);
            return resp.status(200).json({ message: "Task fetched successfully!", task });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to fetch task!", error: error.message });
        }
    }

}

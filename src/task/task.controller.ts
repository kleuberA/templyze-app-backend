import { Body, Controller, Delete, Get, Param, Patch, Res } from '@nestjs/common';
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

    @ApiBearerAuth()
    @Patch('/update/priority-task/:taskid')
    async updatePriorityTask(@Param('taskid') taskID: string, @Res() resp: Response, @Body() body: { priority: string }) {
        try {
            const updatedTask = await this.taskService.updatePriorityTask(taskID, body.priority);
            return resp.status(200).json({ message: "Task priority updated successfully!", task: updatedTask });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to update task priority!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Patch('/update/task/:taskid')
    async updateTask(@Param('taskid') taskID: string, @Res() resp: Response, @Body() body: any) {
        try {
            const updatedTask = await this.taskService.updateTask(taskID, body);
            return resp.status(200).json({ message: "Task updated successfully!", task: updatedTask });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to update task!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Delete('/delete/taskbyid/:taskid')
    async deleteTaskById(@Param('taskid') taskID: string, @Res() resp: Response) {
        try {
            const task = await this.taskService.deleteTaskById(taskID);
            return resp.status(200).json({ message: "Task deleted successfully!", task });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to delete task!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Delete('/delete/all-tasks-by-id/:userid')
    async deleteAllTasksByUserId(@Param('userid') userID: string, @Res() resp: Response) {
        try {
            const tasks = await this.taskService.deleteAllTasksByUserId(userID);
            return resp.status(200).json({ message: "Tasks deleted successfully!", tasks });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to delete tasks!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Get('/get/task-by-priority/:userid/:priority')
    async getTasksByPriority(@Param('userid') userID: string, @Param('priority') priority: string, @Res() resp: Response) {
        try {
            const tasks = await this.taskService.getTasksByUserIdAndPriority(userID, priority);
            return resp.status(200).json({ message: "Tasks by priority fetched successfully!", tasks });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to fetch tasks by priority!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Get('/get/all-priorities/:userid')
    async getAllPriorities(@Param('userid') userID: string, @Res() resp: Response) {
        try {
            const priorities = await this.taskService.getAllPriorities(userID);
            return resp.status(200).json({ message: "Priorities fetched successfully!", priorities });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to fetch priorities!", error: error.message });
        }
    }


}

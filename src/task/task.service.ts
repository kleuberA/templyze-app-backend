import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { } 4

    async getAllTasksByUserId(userId: string) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new Error('User not found!');
        }

        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

    async updatePriorityTask(taskId: string, priority: string) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId,
            }
        })

        if (!task) {
            throw new Error('Task not found!');
        }

        return this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                priority,
            }
        });
    }

    async updateTask(taskId: string, data: any) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId,
            }
        })

        if (!task) {
            throw new Error('Task not found!');
        }

        return this.prisma.task.update({
            where: {
                id: taskId,
            },
            data,
        });
    }

    async getTaskById(taskId: string) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId,
            }
        })

        if (!task) {
            throw new Error('Task not found!');
        }

        return task;
    }

    async deleteTaskById(taskId: string) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId,
            }
        })

        if (!task) {
            throw new Error('Task not found!');
        }

        return this.prisma.task.delete({
            where: {
                id: taskId,
            }
        });
    }

    async deleteAllTasksByUserId(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new Error('User not found!');
        }

        return this.prisma.task.deleteMany({
            where: {
                userId,
            }
        });
    }

}

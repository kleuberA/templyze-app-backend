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

    // async createPriorityTask(userId: string, data: any) {
    //     const user = await this.prisma.user.findUnique({
    //         where: {
    //             id: userId,
    //         }
    //     })

    //     if (!user) {
    //         throw new Error('User not found!');
    //     }

    //     if (!data.priority) {
    //         throw new Error('Priority is required!');
    //     }

    //     return this.prisma.task.create({
    //         data: {
    //             ...data,
    //             userId,
    //         },
    //     });
    // }

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

    async getAllPriorities(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new Error('User not found!');
        }

        const tasks = await this.prisma.task.findMany({
            where: {
                userId,
            },
            select: {
                priority: true,
            },
        });

        const priorities = Array.from(new Set(tasks.map(task => task.priority)));

        return priorities;

    }

    async getTasksByUserIdAndPriority(userId: string, priority: string) {
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
                priority,
            },
        });
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

import prisma from '../config/prisma'
import { Chat } from '@prisma/client'

export const Create = async (data: Omit<Chat, 'id'>) => {
	return await prisma.chat.create({ data })
}

export const Select = async (id: number) => {
	return await prisma.chat.findMany({
		select: {
			id: true,
			message: true,
			user_id_from: true,
			user_id_to: true,
			user1: {
				select: {
					fullname: true,
				},
			},
			user2: {
				select: {
					fullname: true,
				},
			},
		},
		where: {
			OR: [{ user_id_from: id }, { user_id_to: id }],
		},
		orderBy: { id: 'desc' },
	})
}

export const SelectByChat = async (id_from: number, id_to: number) => {
	return await prisma.chat.findMany({
		select: {
			id: true,
			message: true,
			user_id_from: true,
			user_id_to: true,
			user1: {
				select: {
					fullname: true,
				},
			},
			user2: {
				select: {
					fullname: true,
				},
			},
		},
		where: {
			OR: [
				{
					AND: [{ user_id_from: id_from }, { user_id_to: id_to }],
				},
				{
					AND: [{ user_id_from: id_to }, { user_id_to: id_from }],
				},
			],
		},
		orderBy: {
			id: 'asc',
		},
	})
}

export const Delete = async (id: number) => {
	return await prisma.chat.delete({
		where: {
			id,
		},
	})
}

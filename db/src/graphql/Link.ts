import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

export const Link = objectType({
	name: 'Link',
	definition(t) {
		t.nonNull.int('id')
		t.nonNull.string('description')
		t.nonNull.string('url')
		t.field('postedBy', {
			// 1
			type: 'User',
			resolve(parent, args, context) {
				// 2
				return context.prisma.link
					.findUnique({ where: { id: parent.id } })
					.postedBy()
			},
		})
		t.nonNull.list.nonNull.field("voters", {
			type: "User", 
			resolve(parent,args, context) {
				return context.prisma.link
				.findUnique({where: {id: parent.id}})
				.voters()
			}
		})
	},
})

export const LinkQuery = extendType({
	// 2: You are extending the Query root type and adding a new root field to it called feed.
	type: 'Query',
	definition(t) {
		t.nonNull.list.nonNull.field('feed', {
			// 3: You define the return type of the feed query as a not nullable array of link type objects (In the SDL the return type will look like this: [Link!]!).
			type: 'Link',
			resolve(parent, args, context, info) {
				return context.prisma.link.findMany()

			},
		})
	},
})

export const LinkMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('post', {
			type: 'Link',
			args: {
				description: nonNull(stringArg()),
				url: nonNull(stringArg()),
			},
			resolve(parent, args, context) {
				const { description, url } = args
				const { userId } = context

				if (!userId) {
					// 1
					throw new Error('Cannot post without logging in.')
				}

				const newLink = context.prisma.link.create({
					data: {
						description,
						url,
						postedBy: { connect: { id: userId } }, // 2
					},
				})

				return newLink
			},
		})
	},
})

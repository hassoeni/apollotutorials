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

// what to do after each api requests for example create a new post that increments id
export const LinkMutation = extendType({
	//1  You’re extending the Mutation type to add a new root field. You did something similar in the last chapter with the Query type.
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('post', {
			// 2: The name of the mutation is defined as post and it returns a (non nullable) link object.
			type: 'Link',
			args: {
				// 3: Here you define the arguments to your mutation. You can pass arguments to your GraphQL API endpoints (just like in REST).
				// In this case, the two arguments you need to pass are description and url. Both arguments mandatory (hence the nonNull()) because both are needed to create a new link.
				description: nonNull(stringArg()),
				url: nonNull(stringArg()),
			},

			resolve(parent, args, context) {
				const newLink = context.prisma.link.create({
					data: {
						description: args.description, 
						url: args.url
					}
				})
				return newLink
			},
		})
	},
})


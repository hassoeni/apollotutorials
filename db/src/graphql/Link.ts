import { objectType } from 'nexus'

export const Link = objectType({
	//0 objectType is used to create a new type in your GraphQL schema.
	name: 'Link', // 1: The name option defines the name of the type

	definition(t) {
		// 2: Inside the definition, you can add different fields that get added to the type
		t.nonNull.int('id') // 3: This adds a field named id of type Int
		t.nonNull.string('description') //4
		t.nonNull.string('url') //5
	},
})

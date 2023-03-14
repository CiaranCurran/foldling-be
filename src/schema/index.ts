import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'
import { User } from '../entity/user'
import { Word } from '../entity/word'

const WordType = new GraphQLObjectType({
    name: 'word',
    fields: () => ({
        user: { type: GraphQLString },
        word: { type: GraphQLString },
        known: { type: GraphQLString },
        ignore: { type: GraphQLString },
        learning: { type: GraphQLString },
        impressions: { type: GraphQLFloat },
    }),
})

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        username: { type: GraphQLString },
    }),
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        word: {
            type: WordType,
            args: {
                word: { type: GraphQLString },
                user: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const word = await Word.findOne(args)
                return word
            },
        },
        words: {
            type: new GraphQLList(WordType),
            args: {
                user: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const words = await Word.find(args)
                return words
            },
        },
        user: {
            type: UserType,
            args: { username: { type: GraphQLString } },
            resolve: async (parent, args) => {
                const user = await User.findOne(args.user)
                return user
            },
        },
        validateUser: {
            type: GraphQLBoolean,
            args: { username: { type: GraphQLString } },
            resolve: async (parent, args) => {
                const user = await User.findOne(args.user)
                return user ? true : false
            },
        },
    },
})

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWord: {
            type: WordType,
            args: {
                word: { type: GraphQLString },
                user: { type: GraphQLString },
                known: { type: GraphQLBoolean },
                impressions: { type: GraphQLInt },
                learning: { type: GraphQLBoolean },
                ignore: { type: GraphQLBoolean },
            },
            async resolve(parent, args) {
                const word = await Word.save(args)
                return word
            },
        },
        setLearning: {
            type: WordType,
            args: {
                word: { type: GraphQLString },
                user: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const word = await Word.findOne({
                    word: args.word,
                    user: args.user,
                })
                if (word) {
                    word.learning = true
                    await word.save()
                    return word
                } else {
                    return 'The given word does not exist'
                }
            },
        },
        setKnown: {
            type: WordType,
            args: {
                word: { type: GraphQLString },
                user: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const word = await Word.findOne({
                    word: args.word,
                    user: args.user,
                })
                if (word) {
                    word.known = true
                    word.learning = false
                    await word.save()
                    return word
                } else {
                    return 'The given word does not exist'
                }
            },
        },
        impression: {
            type: WordType,
            args: {
                word: { type: GraphQLString },
                user: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const word = await Word.findOne({
                    word: args.word,
                    user: args.user,
                })
                if (word) {
                    word.impressions += 1
                    await word.save()
                } else {
                    return 'The given word does not exist'
                }
            },
        },
        setIgnore: {
            type: WordType,
            args: {
                word: { type: GraphQLString },
                user: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const word = await Word.findOne({
                    word: args.word,
                    user: args.user,
                })
                if (word) {
                    word.ignore = true
                    word.learning = false
                    await word.save()
                    return word
                } else {
                    return 'The given word does not exist'
                }
            },
        },
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const user = await User.save(args)
                return user
            },
        },
    },
})

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutations,
})

export default schema

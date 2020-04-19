import { extendType, arg } from '@nexus/schema'

export const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        data: arg({
          type: 'PostCreateInput',
          nullable: false,
        }),
      },
      resolve(_, { data }, { prisma, select }) {
        return prisma.post.create({
          data,
          ...select,
        })
      },
    })

    t.field('updateOnePost', {
      type: 'Post',
      nullable: false,
      args: {
        where: arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'PostUpdateInput',
          nullable: false,
        }),
      },
      resolve(_, { data, where }, { prisma, select }) {
        return prisma.post.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('deleteOnePost', {
      type: 'Post',
      nullable: true,
      args: {
        where: arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_, { where }, { prisma, select, onDelete }) => {
        await onDelete.cascade('Post', where, false)
        return prisma.post.delete({
          where,
          ...select,
        })
      },
    })

    t.field('updateManyPost', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'PostWhereInput',
          nullable: true,
        }),
        data: arg({
          type: 'PostUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_, { where, data }, { prisma, select }) {
        return prisma.post.updateMany({
          where,
          data,
          ...select,
        })
      },
    })
  },
})

import request from 'supertest'
import { CreateTopicDTO } from '../../../../../modules/topics/dtos/topic.create.dto'
import { UpdateTopicDTO } from '../../../../../modules/topics/dtos/topic.update.dto'
import { ServerFactory } from '../../../server/server.factory'

let serverFactory: ServerFactory
let server: any
const port = 3199

beforeAll(async () => {
    serverFactory = new ServerFactory()
    await serverFactory.start(port)
    server = serverFactory.getApp()
})

afterAll(async () => {
    if (serverFactory && serverFactory['server']) {
        await new Promise<void>((resolve, reject) => {
            serverFactory['server']?.close(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
})

describe('Topics API', () => {
    test('should create a new topic', async () => {
        const createTopicDto: CreateTopicDTO = {
            name: 'New Name',
            content: 'This is a new topic.',
        } as CreateTopicDTO

        const response = await request(server)
            .post('/topics')
            .set('Authorization', 'Bearer 4f6b3d0e9c5f8a7e2d1a9b4c5e7f8d9a')
            .set('useremail', 'admin@example.com')
            .send(createTopicDto)
            .expect(201)

        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe(createTopicDto.name)
        expect(response.body.content).toBe(createTopicDto.content)
    })

    test('should update an existing topic', async () => {
        const createResponse = await request(server)
            .post('/topics')
            .set('Authorization', 'Bearer 4f6b3d0e9c5f8a7e2d1a9b4c5e7f8d9a')
            .set('useremail', 'admin@example.com')
            .send({
                name: 'Topic to Update',
                content: 'Content before update.',
            })
            .expect(201)

        const topicId = createResponse.body.id

        const updateTopicDto: UpdateTopicDTO = {
            content: 'Updated content.',
        }

        const response = await request(server)
            .put(`/topics/${topicId}`)
            .set('Authorization', 'Bearer 4f6b3d0e9c5f8a7e2d1a9b4c5e7f8d9a')
            .set('useremail', 'editor@example.com')
            .send(updateTopicDto)
            .expect(201)

        expect(response.body.content).toBe(updateTopicDto.content)
    })
})

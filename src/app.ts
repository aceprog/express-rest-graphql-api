import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { checkIfAuthenticated } from './middleware/verifyIdToken';
import {RequestWithUser} from '../globalTypes';
import userRoutes from './routes/users';
import swarmRoutes from './routes/swarms';
import notificationRoutes from './routes/notifications'
import cors from 'cors';
import {graphqlHTTP} from 'express-graphql';
import schema from './schema/resolvers';


dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json())
app.use('/graphql',  graphqlHTTP({
  schema: schema,
  graphiql: true
}))
app.use('/api/users', userRoutes)
app.use('/api/swarms', swarmRoutes)
app.use('/api/notifications', notificationRoutes )
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Peerbox API</h1>');
});
app.get('/ping', (req, res)=>{
  res.json({message: 'Pinging'})
})

app.get('/swarms', checkIfAuthenticated, (req: Request, res: Response) => {
    // Access the user object from the request
    const user = (req as RequestWithUser).user;
    

    if(user){
      console.log('Logged in user:', user)
      const swarms = [
        { id: 1, title: 'Swarm 1', description: 'Lorem ipsum' },
        { id: 2, title: 'Swarm 2', description: 'Lorem ipsum' },
        { id: 3, title: 'Swarm 3', description: 'Lorem ipsum' },
    ]
    return res.send(swarms)
    }else{
      return res.json({message: 'User not authenticated'})
    }

    //mock data
    

});



export default app
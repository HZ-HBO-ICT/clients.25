import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Owner} from '../../prisma/types.ts';
import Express from 'express';
const prisma: PrismaClient = new PrismaClient();
const clientsController = Express.Router();

/**
 * Interface for the response object
 */
interface OwnerResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: Owner[]
}

/**
 * Route handling getting all owners
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
clientsController.get('/', async (req, res) => {
  try {
    const owners: Owner[] = await prisma.owner.findMany();
    const ownerResponse: OwnerResponse = {
      meta: {
        count: owners.length,
        title: 'All owners',
        url: req.url
      },
      data: owners
    };
    res.status(200).send(ownerResponse);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Failed to retrieve owners',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
})

/**
 * Route handling getting owner by id request
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
clientsController.get('/:id', async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send({
        error: {
          message: 'Invalid owner ID',
          code: 'INVALID_ID',
          url: req.url
        }
      });
      return;
    }
    const owner: Owner | null = await prisma.owner.findUnique({
      where: { id }
    });
    if (!owner) {
      res.status(404).send({
        error: {
          message: `Owner with ID ${id} not found`,
          code: 'NOT_FOUND',
          url: req.url
        }
      });
      return;
    }
    res.status(200).send(owner);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
})

export default clientsController;

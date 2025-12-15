import { Router } from 'express';
import { createAgendaController } from '../controllers/CreateScheduleController.js';
import { getAgendaByIdController } from '../controllers/IDScheduleController.js';
import { getAllAgendasController } from '../controllers/AllScheduleController.js';
import { updateAgendaController } from '../controllers/UpdateScheduleController.js';
import { deleteAgendaController } from '../controllers/DeleteScheduleController.js';

const router = Router();

router.post('/agendas', createAgendaController);
router.get('/agendas', getAllAgendasController);
router.get('/agendas/:id', getAgendaByIdController);
router.put('/agendas/:id', updateAgendaController);
router.delete('/agendas/:id', deleteAgendaController);

export default router;

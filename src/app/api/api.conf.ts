import { gkApiCreators, GKApi } from '@goku/http';

const DEPARTMENT = gkApiCreators('/api/department', 'O');

export const API = {
  DEPARTMENT,
};

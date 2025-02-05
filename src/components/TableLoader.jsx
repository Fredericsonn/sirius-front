import { spring } from '../util';

const machineLoader = (store) => async () => {
    const user = store.getState().userState.user;
    console.log(user);
    const response = await spring.get('/machines');
    return response.data;
};

export default machineLoader;

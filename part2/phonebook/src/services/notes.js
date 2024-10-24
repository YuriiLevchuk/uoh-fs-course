import axios from 'axios';

const url = 'http://localhost:3001/persons';

const GETrequest = () => axios.get(url).then(x => x.data);

const POSTrequest = (newRecord) => axios.post(url, newRecord).then(x => x.data);

const DELETErequest = (id) => axios.delete(`${url}/${id}`).then(x => x.data);

const PUTrequest = (newRecord, id) => axios.put(`${url}/${id}`, newRecord).then(x => x.data);

export default { GETrequest, POSTrequest, DELETErequest, PUTrequest }

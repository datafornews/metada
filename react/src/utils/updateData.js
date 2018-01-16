import Axios from 'axios';
import formatData from './formatData';
import formatUpdateData from './formatUpdateData';

function updateData(component) {
    // When updating this function, be sure to update its background counterpart

    var ts2 = Math.round((new Date()).getTime() / 1000);
    var ts;
    // element is the react component
    if (localStorage.dataTime) {
        ts = parseInt(localStorage.dataTime, 10);
        var checkEvery = 20;//3600 * 24; // 1 day
    } else {
        ts = 0;
    }
    // 1511996122
    if ((!localStorage.dataTime || ts2 - ts > checkEvery) && localStorage.fetchingData !== 'true') {
        console.log('Looking for DB Update...');
        localStorage.dataTime = Math.round((new Date()).getTime() / 1000);
        // if (localStorage.updateFromLocal && localStorage.updateFromLocal === 'true') {
        //     const data = formatData(JSON.parse(localStorage.data));
        //     component.props.setData(data);
        //     component.props.makeDataAvailable();
        //     localStorage.dataTime = Math.round((new Date()).getTime() / 1000) + '';
        //     localStorage.updateFromLocal = 'false';
        // } else {
        Axios.get('https://oop-pro.herokuapp.com/public/update?timestamp=' + ts).then(
            (response) => {
                if (response.data && (response.data.entities.length > 0 || response.data.shares.length >0)){
                    const updatedServerData = formatUpdateData(component.props.data, response.data);
                    const updatedData = formatData(updatedServerData);
                    component.props.setData(updatedData);
                    component.props.makeDataAvailable();
                    localStorage.data = JSON.stringify(updatedData);
                    console.log('Success (DB Update)');
                } else {
                    console.log('No DB Update.');
                }
            },
            (error) => {
                console.log('Server Error (updating data)');
                console.log(error);

            }).catch(
            (error) => {
                console.log('Catching JS Error (updating data)');
                console.log(error);
            });
        // }
    }
}

export default updateData;
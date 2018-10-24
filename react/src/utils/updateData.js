import Axios from 'axios';
import formatData from './formatData';
import formatUpdateData from './formatUpdateData';

async function updateData(component) {
    // When updating this function, be sure to update its background counterpart

    var tsNow = Math.round((new Date()).getTime() / 1000);
    var tsData;
    // element is the react component
    if (localStorage.dataTime) {
        tsData = parseInt(localStorage.dataTime, 10);
        var checkEvery = 20;//3600 * 24; // 1 day
    } else {
        tsData = 0;
    }
    // 1511996122
    if ((!localStorage.dataTime || tsNow - tsData > checkEvery) && localStorage.fetchingData !== 'true') {
        console.log('Looking for DB Update...');
        localStorage.dataTime = Math.round((new Date()).getTime() / 1000);
        // if (localStorage.updateFromLocal && localStorage.updateFromLocal === 'true') {
        //     const data = formatData(JSON.parse(localStorage.data));
        //     component.props.setData(data);
        //     component.props.makeDataAvailable();
        //     localStorage.dataTime = Math.round((new Date()).getTime() / 1000) + '';
        //     localStorage.updateFromLocal = 'false';
        // } else {
        console.log('Trying data at', tsData);
        Axios.get('https://oop-stage.herokuapp.com/public/update?timestamp=' + tsData).then(
            (response) => {
                if (response.data && (response.data.entities.length > 0 || response.data.shares.length > 0)) {
                    console.log('response.data :', response.data);
                    response.data.entities.forEach(v => {
                        localStorage.removeItem('cytoData_' + v.id)
                        localStorage.removeItem('wiki_' + v.id + '_fr')
                        localStorage.removeItem('wiki_' + v.id + '_en')
                    })
                    response.data.shares.forEach(v => {
                        localStorage.removeItem('cytoData_' + v.child_id)
                        localStorage.removeItem('cytoData_' + v.parent_id)
                        localStorage.removeItem('wiki_' + v.child_id + '_fr')
                        localStorage.removeItem('wiki_' + v.parent_id + '_fr')
                        localStorage.removeItem('wiki_' + v.child_id + '_en')
                        localStorage.removeItem('wiki_' + v.parent_id + '_en')
                        return null
                    })
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
                localStorage.dataTime = tsData;

            }).catch(
                (error) => {
                    console.log('Catching JS Error (updating data)');
                    console.log(error);
                    localStorage.dataTime = tsData;
                });
        // }
    }
}

export default updateData;
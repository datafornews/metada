import Axios from 'axios';
import formatData from './formatData';

// Use local json data or fetch from server
var USE_LOCAL_ONLY = true;

async function fetchData(component) {
    // When updating this function, be sure to update its background counterpart

    // whether or not to go fetch the data
    let fetch = false;

    let data;
    if (localStorage.serverData) {
        const serverData = JSON.parse(localStorage.serverData);
        console.log('using local severData:', serverData);
        data = formatData(serverData);
        component.props.setData(data);
        component.props.makeDataAvailable();
        localStorage.data = JSON.stringify(data);

    } else if (localStorage.data) {
        try {
            // console.log('Loading localStorage data');
            data = JSON.parse(localStorage.data);
            component.props.setData(data);
            component.props.makeDataAvailable();
        } catch (e) {
            console.log(e)
            console.log('Error loading localStorage data; getting new version...');
            fetch = true;
        }
    } else {
        fetch = true;
    }

    if (fetch && USE_LOCAL_ONLY) {
        console.log('Getting data (Axios)...');
        Axios.get('https://oop-pro.herokuapp.com/public/data').then(
            (response) => {
                console.log('Success (getting data)');
                data = formatData(response.data);
                component.props.setData(data);
                component.props.makeDataAvailable();
                localStorage.data = JSON.stringify(data);
                localStorage.dataTime = Math.round((new Date()).getTime() / 1000) + ''
            },
            (error) => {
                console.log('Server Error  (getting data)');
                console.log(error);
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting data)');
                console.log(error);
            });
    }
}

export default fetchData;
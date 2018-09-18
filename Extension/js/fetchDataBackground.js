async function fetchData(force) {
    // When updating this function, be sure to update its react counterpart
    localStorage.fetchingData = 'true';
    // whether or not to go fetch the data
    let fetch = false;

    let data;

    if (backgroundData) {
        if (!localStorage.serverData) {
            localStorage.serverData = JSON.stringify(backgroundData());
            localStorage.fetchingData = 'false';
            localStorage.dataTime = '1511996122';
            console.log('fetched data from file')
            return;
        }
    } else {
        console.log('no backgroundData file')
    }

    if (localStorage.data) {
        try {
            // console.log('Loading localStorage data');
            data = JSON.parse(localStorage.data);
            localStorage.fetchingData = 'false';
            return;
        } catch (e) {
            console.log('Error loading localStorage data (background); getting new version...');
            fetch = true;
        }
    } else {
        fetch = true;
    }

    if (fetch || force) {
        console.log('Getting data (Axios)...');
        axios.get('https://oop-pro.herokuapp.com/public/data').then(
            (response) => {
                console.log('Success (getting data background)');
                data = formatData(response.data);
                localStorage.data = JSON.stringify(data);
                localStorage.dataTime = Math.round((new Date()).getTime() / 1000);
                localStorage.fetchingData = 'false';
            },
            (error) => {
                console.log('Server Error  (getting data background)');
                console.log(error);
                localStorage.fetchingData = 'false';
            }).catch(
            (error) => {
                console.log('Catching JS Error (getting data background)');
                console.log(error);
                localStorage.fetchingData = 'false';
            });
    }
}
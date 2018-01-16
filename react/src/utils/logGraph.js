export default function (_id) {
    const id = _id + '';
    const graphHistory = sessionStorage.getItem('graphHistory');
    if (graphHistory) {
        let history = JSON.parse(graphHistory);
        if (id !== history[history.length - 1]) {
            history = history.slice(0, JSON.parse(
                sessionStorage.getItem('location')) + 1)
            history.push(id)
            sessionStorage.setItem('graphHistory', JSON.stringify(
                history
            ));
            sessionStorage.setItem('location', JSON.parse(
                sessionStorage.getItem('location')) + 1
            );
        }
    } else {
        sessionStorage.setItem('graphHistory', JSON.stringify(
            [id]
        ));
        sessionStorage.setItem('location', JSON.stringify(
            0
        ));
    }
}
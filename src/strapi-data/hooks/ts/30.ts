export function onCreate(props) {
        const { user, item, initData } = props;
        const response = { ...item };
        response.data.cafm = initData;
        return response;
}
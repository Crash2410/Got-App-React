import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';

const withData = (View) => {
    return (props) => {

        const [data, updateData] = useState(null);
        const [loading, updateLoading] = useState(true);

        useEffect(() => {
            const { getData } = props;
            getData()
                .then((data) => {
                    updateData(data);
                    updateLoading(false);
                });
        }, [])

        if (!data) {
            return <Spinner />
        }

        return (
            <View {...props} data={data} loading={loading} />
        )

    }
}

export default withData;
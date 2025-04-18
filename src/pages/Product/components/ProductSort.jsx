import { Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    indicator: {
        backgroundColor: 'black',
    },
    selectedTab: {
        color: 'black',
        fontWeight: 'bold',
    },
});

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
    const classes = useStyles();

    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    };

    return (
        <Tabs
            value={currentSort}
            classes={{ indicator: classes.indicator }}
            onChange={handleSortChange}
            aria-label='disabled tabs example'
        >
            <Tab
                label='GIÁ THẤP ĐẾN CAO'
                value='asc'
                classes={{ selected: classes.selectedTab }}
            />
            <Tab
                label='GIÁ CAO ĐẾN THẤP'
                value='desc'
                classes={{ selected: classes.selectedTab }}
            />
        </Tabs>
    );
}

export default ProductSort;

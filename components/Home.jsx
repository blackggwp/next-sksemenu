import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Menu from './Menu';
import { useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home({ brandid, brandType }) {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [isS81, setIsS81] = React.useState(false);

  useEffect(() => {
    if (brandid === 'bq-huahin') {
      setIsS81(true)
      setValue("two")
    }
  }, [brandid])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={brandType === 'catalogue' ? null : { display: "none" }} >
        <Tabs value={value}
          variant="fullWidth"
          onChange={handleChange} aria-label="wrapped label tabs example">
          {!isS81 &&
            <Tab
              value="one"
              label="Overload"
              wrapped
              {...a11yProps('one')}
            />
          }
          <Tab value="two" label="A lacarte" {...a11yProps('two')} />
        </Tabs>
      </AppBar>
      {!isS81 &&
        <TabPanel value={value} index="one">
          <Menu
            brandid={brandType === 'catalogue' ? `${brandid}-ovl` : brandid}
            brandType={brandType}
          />
        </TabPanel>
      }
      <TabPanel value={value} index="two">
        <Menu
          brandid={brandType === 'catalogue' ? `${brandid}-alc` : brandid}
          brandType={brandType}
        />
      </TabPanel>
    </div>
  );
}

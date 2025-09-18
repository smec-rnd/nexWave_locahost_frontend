import GuageAndData from '../../gaugeAndData/index'
import GuageAndData1 from '../../gaugeAndData2/index'
import GuageAndData2 from '../../gaugeAndData3/index'
import { useContext, useEffect } from 'react';
import { DashboardContext } from '../../context/context';

const HeroSection = () => {
  const { setBackNav } = useContext(DashboardContext); 

  useEffect(() => {
    setBackNav(false);  //we need to hide back navigation button when this page render
  }, [setBackNav]); 

  return (
    <>
      <GuageAndData/>
      <GuageAndData1/>
      <GuageAndData2/>
    </>
  )
}

export default HeroSection
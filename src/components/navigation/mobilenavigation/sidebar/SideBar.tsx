import './SideBar.css'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../../../routes/RoutingPath'

export const SideBar = (props: {sideBarIsOpen: boolean, sideBarHandler: Function}) => {

  const history = useHistory()
  
  const handleRedirectFromSideBar = (selectedView: string) => {
    history.push(selectedView)
    props.sideBarHandler(false)
  }

  return (
    <div className={props.sideBarIsOpen ? 'sideBarWrapper open' : 'sideBarWrapper'}>
        <button onClick={() => handleRedirectFromSideBar(RoutingPath.signUpView)}>Gå med,</button>
        <button onClick={() => handleRedirectFromSideBar(RoutingPath.logInView)}>Logga in,</button>
        <button onClick={() => handleRedirectFromSideBar(RoutingPath.aboutView)}>Eller få veta hur det fungerar?</button>
    </div>
  )
}
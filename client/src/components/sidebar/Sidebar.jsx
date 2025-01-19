import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutSuccess } from '../../redux/authSlice';


const Sidebar = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	

	const { currentUser } = auth;
		const handleClick = (e) => {
			e.preventDefault();
			dispatch(logoutSuccess());
			localStorage.removeItem('auth');
			history.push('/signin');
			window.location.reload();
		};

	return (
		<div>
			<ul className='sidebar'>
				<li className='list-item'>
					<h5>{currentUser.username}</h5>
				</li>
				<li className='list-item'>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
				<div className='header'>
					{auth.currentUser && auth.currentUser.token ? (
						<Link to='/signin' className='button' onClick={handleClick}>
							SignOut
						</Link>
					) : (
						<>
							<Link to='/signin' className='button'>
								SignIn
							</Link>
							<Link to='/signup' className='button'>
								SignUp
							</Link>
						</>
					)}
				</div>
			</ul>
		</div>
	);
};

export default Sidebar;

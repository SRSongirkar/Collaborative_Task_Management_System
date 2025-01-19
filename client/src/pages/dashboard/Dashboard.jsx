import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.scss";
import { useEffect } from "react";
import { getAllTasks } from "../../redux/taskSlice";
const Dashboard = () => {
  const tasklist = useSelector((state) => state.task);
  const { AllTasks } = tasklist;
  const user = useSelector((state) => state.auth);
  const { currentUser } = user;
  const navigate = useNavigate();


  let pendingTask = [];
  let completedTask = [];
  for (let i = 0; i < AllTasks.length; i++) {
    if (AllTasks[i].status === "todo") {
      pendingTask.push(AllTasks[i]);
    } else if (AllTasks[i].status === "done") {
      completedTask.push(AllTasks[i]);
    }
  }

  const handleButtonClick = () => {
    navigate('/taskmanager');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard__left">
          <Sidebar />
        </div>
        <div className="dashboard__right">
          <div className="dashboard__rightContent">
            <h2>Dashboard</h2>
            <div className="taskcount">
              <div className="todo box">
                Present Task - {pendingTask.length}
              </div>
              <div className="done box">Complete - {completedTask.length}</div>
            </div>
            <div className="createButton">
              <button className="button" onClick={handleButtonClick}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

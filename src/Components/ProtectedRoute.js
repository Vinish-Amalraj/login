const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  return  token!=null?true:false;}

export default ProtectedRoute;

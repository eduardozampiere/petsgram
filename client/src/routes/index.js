import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const Login = lazy(() => import('../components/Login'));
const ForgotPass = lazy(() => import('../components/ForgotPass'));
const Signup = lazy(() => import('../components/Signup'));
const ResetPass = lazy(() => import('../components/ResetPass'));

const Content = lazy(() => import('../components/Content'));
const PostContent = lazy(() => import('../components/PostContent'));
const Home = lazy(() => import('../components/Home'));
const Profile = lazy(() => import('../components/Profile'));
const Edit = lazy(() => import('../components/Edit'));
const EditProfile = lazy( () => import('../components/EditProfile'));

export default function(){
	// localStorage.removeItem('@petsgram-token');
	return (
		<Router>
			<Suspense fallback={''}>
				<Switch>
					<Route path="/" exact>
						<Content>
							<Home />
						</Content>
					</Route>

					<Route path="/edit" exact>
						<Content>
							<Edit />
						</Content>
					</Route>

					<Route path="/post/:id" exact>
						<Content>
							<PostContent />
						</Content>
					</Route>

					<Route path="/edit/profile" exact>
						<Content>
							<Edit>
								<EditProfile />
							</Edit>
						</Content>
					</Route>

					<Route path="/edit/privacy" exact>
						<Content>
							<Edit>
								<h1>Privacidade</h1>
							</Edit>
						</Content>
					</Route>
					
					<Route path="/login" exact>
						<Login />
					</Route>

					<Route path="/esqueci-senha" exact>
						<ForgotPass />
					</Route>

					<Route path="/change-password/:token/:user" exact>
						<ResetPass />
					</Route>

					<Route path="/signup" exact>
						<Signup />
					</Route>

					<Route path="/:username" exact>
						<Content>
							<Profile />
						</Content>
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
}
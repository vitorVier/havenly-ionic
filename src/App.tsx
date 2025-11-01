import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import './globals.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { Details } from './pages/details';
import { ProfilePage } from './pages/profile';
import { SecurityPage } from './pages/security';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Tab1 />
          </Route>
          <Route exact path="/accommodations">
            <Tab2 />
          </Route>
          <Route path="/reservations">
            <Tab3 />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/accommodations">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Accommodations</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/reservations">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Reservations</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      <Route exact path="/details/:id">
        <Details />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/security">
        <SecurityPage />
      </Route>
    </IonReactRouter>
  </IonApp>
);

export default App;

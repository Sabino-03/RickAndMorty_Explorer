import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login.component';
import { DashBoardComponent } from './components/dashboard-component/dashboard.component';

export const routes : Routes = [
    { path: '',
      component: LoginComponent },

    { path: 'explore',
      component: DashBoardComponent,
      children: [
        { path: '',
        },
        { path: ':id',
        }
      ]
    },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login.component';
import { DashBoardComponent } from './components/dashboard-component/dashboard.component';
import { CardComponent } from './components/card-component/card.component';
import { TableComponent } from './components/table-component/table.component';
import { FavouriteComponent } from './components/favourite-component/favourite.component';
import { AuthGuard } from './services/guard/auth.guard';

export const routes : Routes = [
    { path: '',
      component: LoginComponent },

    { path: 'explore',
      component: DashBoardComponent,
      canActivate: [ AuthGuard ],
      children: [
        { path: '',
          component: TableComponent
        },
        { path: ':id',
          component: CardComponent
        }
      ]
    },

    { path: 'favourite',
      component: FavouriteComponent,
      canActivate: [ AuthGuard ]
    }
];

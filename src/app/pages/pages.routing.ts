import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';


const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate : [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data :{ titulo : "Dashboard"} },
          { path: 'progress', component: ProgressComponent, data :{ titulo : "Barras de Pfogreso"}  },
          { path: 'grafica1', component: Grafica1Component, data :{ titulo : "Graficas #1"}  },
          { path: 'promesas', component: PromesasComponent, data :{ titulo : "Promesas"}  },
          { path: 'rxjs', component: RxjsComponent, data :{ titulo : "RxJs"}  },
          { path: 'account-settings', component: AccountSettingsComponent, data :{ titulo : "Configuracion de Cuenta"}  },
          { path: 'perfil', component: PerfilComponent, data :{ titulo : "Perfil de Usuario"}  },
          

          //Rutas de Mantenimiento
          { path: 'usuarios', component: UsuariosComponent, data :{ titulo : "Mantenimiento de Usuarios"}  },
          { path: 'hospitales', component: HospitalesComponent, data :{ titulo : "Mantenimiento de Hospitales"}  },
          { path: 'medicos', component: MedicosComponent, data :{ titulo : "Mantenimiento de Médicos"}  },
          { path: 'medicos/:id', component: MedicoComponent, data :{ titulo : "Mantenimiento de Médico"}  },

        ]
      },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

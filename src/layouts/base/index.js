import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavBar } from '../../containers'
import moment from 'moment'

import { FunnelPlotOutlined, CustomerServiceOutlined } from '@ant-design/icons'

import {
  BaseLogo,
  BaseLogoImg,
  BaseLayout,
  BaseContent,
  BaseBody,
  BaseFooter
} from './styles'

moment.locale('es')

const { Sider } = Layout
const { SubMenu } = Menu

export const Base = ({ current, currentMenu, children }) => {
  const [collapsed, onCollapse] = useState(false)
  return (
    <BaseLayout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => onCollapse(!collapsed)}
      >
        <BaseLogo>
          <BaseLogoImg src='/static/img/logo_white.svg' />
        </BaseLogo>
        <Menu
          theme='dark'
          selectedKeys={current}
          defaultOpenKeys={[currentMenu]}
          mode='inline'
        >
          <Menu.Item key='home'>
            <Link href='/'>
              <a>
                <Icon type='home' />
                <span>Inicio</span>
              </a>
            </Link>
          </Menu.Item>
          <SubMenu
            key='user'
            onTitleClick={() => Router.push('/usuarios')}
            title={
              <span>
                <Icon type='user' />
                <span>Usuarios</span>
              </span>
            }
          >
            <Menu.Item key='user-list'>
              <Link href='/usuarios'>
                <a>Todos los usuarios</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-interested'>
              <Link href='/usuarios/interesados'>
                <a>Interesados</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-clients'>
              <Link href='/usuarios/clientes'>
                <a>Clientes</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-students'>
              <Link href='/usuarios/estudiantes'>
                <a>Estudiantes</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-teachers'>
              <Link href='/usuarios/docentes'>
                <a>Docentes</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-assessors'>
              <Link href='/usuarios/asesores'>
                <a>Asesores</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-export'>
              <Link href='/usuarios/exportar'>
                <a>Exportar</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='user-sms'>
            <Link href='/usuarios/sms'>
              <a>SMS</a>
            </Link>
          </Menu.Item>
          </SubMenu>
          <Menu.Item key='company-list'>
            <Link href='/empresas'>
              <a>
                <Icon type='shop' />
                <span>Empresas</span>
              </a>
            </Link>
          </Menu.Item>
          <SubMenu
            key='deal'
            onTitleClick={() => Router.push('/tratos')}
            title={
              <span>
                <FunnelPlotOutlined />
                <span>Tratos</span>
              </span>
            }
          >
            <Menu.Item key='deals'>
              <Link href='/tratos'>
                <a>Todos los tratos</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='deal-progress'>
              <Link href='/progresos'>
                <a>Etapas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='deal-mix'>
              <Link href='/tratos/combinar'>
                <a>Fusionar</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='deal-client'>
              <Link href='/tratos/cliente'>
                <a>Cambiar</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='deal-reasign'>
              <Link href='/tratos/reasignar'>
                <a>Reasignar</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='call-center'
            onTitleClick={() => Router.push('/plantillas')}
            title={
              <span>
                <CustomerServiceOutlined />
                <span>Call center</span>
              </span>
            }
          >
            <Menu.Item key='template-list'>
              <Link href='/plantillas'>
                <a>Plantillas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='call-list'>
              <Link href='/llamadas'>
                <a>Llamadas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='email-list'>
              <Link href='/emails'>
                <a>Email</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='whatsapp-list'>
              <Link href='/whatsapps'>
                <a>Whatsapp</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='timetable-list'>
              <Link href='/timetables'>
                <a>Horarios</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='courses'
            onTitleClick={() => Router.push('/cursos')}
            title={
              <span>
                <Icon type='read' />
                <span>Cursos</span>
              </span>
            }
          >
            <Menu.Item key='courses-list'>
              <Link href='/cursos'>
                <a>Todos los cursos</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='category-list'>
              <Link href='/categorias'>
                <a>Categorías</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='enrols'>
              <Link href='/matriculas'>
                <a>Matrículas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='certificates'>
              <Link href='/certificados'>
                <a>Certificados</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='migrate'>
              <Link href='/certificados/migrate'>
                <a>Migrar certificados</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='score'>
              <Link href='/calificaciones'>
                <a>Calificaciones</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='labels'>
              <Link href='/etiquetas'>
                <a>Etiquetas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='agreement-list'>
              <Link href='/convenios'>
                <a>Convenios</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='prices-list'>
              <Link href='/precios'>
                <a>Precios</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='reportes'
            onTitleClick={() => Router.push('/reportes/calificaciones')}
            title={
              <span>
                <Icon type="area-chart" />
                <span>Reportes</span>
              </span>
            }
          >
            <Menu.Item key='reportes-calificaciones'>
              <Link href='/reportes/calificaciones'>
                <a>Calificaiones general</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='reportes-ordenes'>
              <Link href='/reportes/ordenes'>
                <a>Ventas general</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='reportes-matriculas'>
              <Link href='/reportes/matriculas'>
                <a>Matriculas general</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='reportes-nocontesto'>
              <Link href='/reportes/contesto'>
                <a>No contestó</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='sale'
            onTitleClick={() => Router.push('/ventas')}
            title={
              <span>
                <Icon type='read' />
                <span>Ventas</span>
              </span>
            }
          >
            <Menu.Item key='sale-list'>
              <Link href='/ventas'>
                <a>Todas las ventas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='vouchers-list'>
              <Link href='/vouchers'>
                <a>Vouchers</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='receipt-list'>
              <Link href='/recibos'>
                <a>Comprobantes</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='order-list'>
              <Link href='/ordenes'>
                <a>Ordenes</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='payments'>
              <Link href='/pagos'>
                <a>Metodos de Pagos</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='paycash-list'>
              <Link href='/paycash'>
                <a>Pagos por paycash</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='marketing'
            onTitleClick={() => Router.push('/marketing')}
            title={
              <span>
                <Icon type="funnel-plot" />
                <span>Marketing</span>
              </span>
            }
          >
            <Menu.Item key='marketing-initial'>
              <Link href='/marketing'>
                <a>Inicio</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-certificados'>
              <Link href='/marketing/certificados'>
                <a>Certificados whatsapp</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-email'>
              <Link href='/marketing/certificados-email'>
                <a>Certificados email</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-notanswer1'>
              <Link href='/marketing/no-contesto-1'>
                <a>No contesto 1</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-notanswer2'>
              <Link href='/marketing/no-contesto-2'>
                <a>No contesto 2</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-notanswer3'>
              <Link href='/marketing/no-contesto-3'>
                <a>No contesto 3</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-debtor'>
              <Link href='/marketing/deudor'>
                <a>Deudor</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='marketing-tracing'>
              <Link href='/marketing/seguimiento'>
                <a>Seguimiento</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='contact-list'>
            <Link href='/contactos'>
              <a>
                <Icon type='phone' />
                <span>Contactos</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key='metas'>
            <Link href='/metas'>
              <a>
                <Icon type='code' />
                <span>Metadata</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key='testimony'>
            <Link href='/testimonios'>
              <a>
                <Icon type='audit' />
                <span>Testimonios</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key='claim'>
            <Link href='/reclamos'>
              <a>
                <Icon type='file-text' />
                <span>Reclamos</span>
              </a>
            </Link>
          </Menu.Item>
          <SubMenu
            key='migrations'
            onTitleClick={() => Router.push('/migraciones/certificados')}
            title={
              <span>
                <Icon type="area-chart" />
                <span>Migraciones</span>
              </span>
            }
          >
            <Menu.Item key='migrations-certificates'>
              <Link href='/migraciones/certificados'>
                <a>Migrar Certificados</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='migrations-sales'>
              <Link href='/migraciones/ventas'>
                <a>Migrar Ventas</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='migrations-deal-agreements'>
              <Link href='/migraciones/deal-agreements'>
                <a>Migrar convenio a certificados</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='migrations-enrol-agreements'>
              <Link href='/migraciones/enrol-agreements'>
                <a>Migrar convenio a matriculas</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <BaseContent>
        <NavBar />
        <BaseBody>{children}</BaseBody>
        <BaseFooter>Escuela Americana de Imnovación ©2020</BaseFooter>
      </BaseContent>
    </BaseLayout>
  )
}

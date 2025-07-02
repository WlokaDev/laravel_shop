import '../css/app.css'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { setupI18n } from './i18n'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = hydrateRoot(
      el,
      <HeroUIProvider locale={'pl'} className={'h-max min-h-dvh'}>
        <ToastProvider placement="top-right" />
        <App {...props} />
      </HeroUIProvider>,
    )

    const translations = props.initialPage.props.translations
    const locale = props.initialPage.props.locale

    setupI18n({
      translations,
      locale,
    })
  },
  progress: {
    color: '#4B5563',
  },
}).then(() => document.getElementById('app').removeAttribute('data-page'))

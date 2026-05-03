# React + TypeScript + Vite

# Entorno de desarrollo
- Herramientas necesarias ``node 22.18^``.

# Pasos de instalación

#### Importante
Para que el frontend funcione correctamente, deben estar activos simultáneamente los servicios de la API de autenticación (auth) y de piezas (pieces).

1. Clonar el repositorio: `https://github.com/DanielZC/SPA.git`
2. Estar dentro de la carpeta del proyecto y ejecutar `npm install`
3. Ejecutar `npm run dev` para iniciar el servicio del frontend
4. Para acceder, debe ingresar al enlace: `http://localhost:5173/`

# Decisiones técnicas

### Diseño

- **TailwindCSS + Vite:** Framework de utilidades CSS que se integra con Vite para generar estilos de forma optimizada en tiempo de compilación.
- **React Hook Form:** Biblioteca para el manejo del estado de formularios y validación de entradas, optimizando los renders y reduciendo el código.
- **Axios:** Cliente HTTP basado en promesas para realizar peticiones asíncronas entre el frontend y los distintos endpoints de la API.
- **shadcn/ui:** Conjunto de componentes accesibles y reutilizables (inputs, botones, tarjetas, modales, etc.) que se integran directamente en el código fuente.
- **Context API:** Gestión de estados globales que evita el prop drilling facilitando el acceso a datos compartidos en múltiples componentes.
- **Zod:** Biblioteca de validación y declaración de esquemas estáticos, utilizada para garantizar la integridad de los datos antes de ser enviados al backend.
- **Lucide React:** Conjunto de iconos SVG optimizados para React, ligeros y personalizables mediante props.
- **React Router:** Biblioteca estándar para el manejo de enrutamiento declarativo en aplicaciones React, permitiendo navegación SPA basada en rutas.

### Dependencias usadas
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) – Adaptadores para integrar Zod y otros validadores con React Hook Form.
- [TailwindCSS + Vite](https://tailwindcss.com/docs/installation/using-vite) – Documentación oficial de integración.
- [React Hook Form](https://www.react-hook-form.com/) – Documentación oficial.
- [React Router](https://reactrouter.com/) – Documentación oficial.
- [Lucide React](https://lucide.dev/guide/react/) – Documentación oficial.
- [shadcn/ui](https://ui.shadcn.com/docs/components) – Documentación oficial.
- [Axios](https://axios.rest/es/pages/getting-started/first-steps) – Documentación oficial.
- [Zod](https://zod.dev/) – Documentación oficial.

# Requisitos adicionales cumplidos
- Manejo de errores provenientes del backend
- Manejo de estado global (Context)
- Manejo visual de errores sin perder datos del formulario

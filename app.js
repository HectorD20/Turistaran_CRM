/* =========================================================
   TURISTARÁN ERP & CRM
   APP.JS — ESTRUCTURA BASE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       1. ELEMENTOS PRINCIPALES
       ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");

    const pageContainer = document.getElementById("page-container");
    const pageTitle = document.getElementById("page-title");
    const breadcrumbSection = document.getElementById("breadcrumb-section");

    const globalSearch = document.getElementById("global-search");

    const notificationButton = document.getElementById("notifications-button");
    const notificationPanel = document.getElementById("notification-panel");

    const profileButton = document.getElementById("user-profile-button");
    const profileMenu = document.getElementById("profile-menu");

    const globalModal = document.getElementById("global-modal");


    /* =====================================================
       2. CONFIGURACIÓN DE PÁGINAS
       ===================================================== */

    const pageConfig = {
        dashboard: {
            title: "Dashboard",
            breadcrumb: "Dashboard"
        },

        leads: {
            title: "Leads",
            breadcrumb: "Ventas / Leads"
        },

        clientes: {
            title: "Clientes / Empresas",
            breadcrumb: "Ventas / Clientes"
        },

        cotizaciones: {
            title: "Cotizaciones",
            breadcrumb: "Ventas / Cotizaciones"
        },

        seguimientos: {
            title: "Seguimientos",
            breadcrumb: "Ventas / Seguimientos"
        },

        oportunidades: {
            title: "Oportunidades",
            breadcrumb: "Ventas / Oportunidades"
        },

        proveedores: {
            title: "Proveedores",
            breadcrumb: "Compras / Proveedores"
        },

        "solicitudes-compra": {
            title: "Solicitudes de compra",
            breadcrumb: "Compras / Solicitudes de compra"
        },

        "ordenes-compra": {
            title: "Órdenes de compra",
            breadcrumb: "Compras / Órdenes de compra"
        },

        recepciones: {
            title: "Recepciones",
            breadcrumb: "Compras / Recepciones"
        },

        inventario: {
            title: "Inventario",
            breadcrumb: "Compras / Inventario"
        },

        "three-way-matching": {
            title: "3-Way Matching",
            breadcrumb: "Compras / 3-Way Matching"
        },

        proyectos: {
            title: "Proyectos",
            breadcrumb: "Proyectos / Proyectos"
        },

        tareas: {
            title: "Tareas",
            breadcrumb: "Proyectos / Tareas"
        },

        progreso: {
            title: "Progreso",
            breadcrumb: "Proyectos / Progreso"
        },

        "materiales-proyecto": {
            title: "Materiales del proyecto",
            breadcrumb: "Proyectos / Materiales"
        },

        "costos-proyecto": {
            title: "Costos del proyecto",
            breadcrumb: "Proyectos / Costos"
        },

        finanzas: {
            title: "Finanzas",
            breadcrumb: "Finanzas / Finanzas"
        },

        contabilidad: {
            title: "Contabilidad",
            breadcrumb: "Finanzas / Contabilidad"
        },

        "cuentas-cobrar": {
            title: "Cuentas por cobrar",
            breadcrumb: "Finanzas / Cuentas por cobrar"
        },

        "cuentas-pagar": {
            title: "Cuentas por pagar",
            breadcrumb: "Finanzas / Cuentas por pagar"
        },

        costeo: {
            title: "Costeo",
            breadcrumb: "Finanzas / Costeo"
        },

        "reportes-financieros": {
            title: "Reportes financieros",
            breadcrumb: "Finanzas / Reportes financieros"
        },

        proyecciones: {
            title: "Proyecciones",
            breadcrumb: "Finanzas / Proyecciones"
        },

        personal: {
            title: "Personal",
            breadcrumb: "RH / Personal"
        },

        asistencias: {
            title: "Asistencias",
            breadcrumb: "RH / Asistencias"
        },

        contrataciones: {
            title: "Contrataciones",
            breadcrumb: "RH / Contrataciones"
        },

        "vacaciones-permisos": {
            title: "Vacaciones y permisos",
            breadcrumb: "RH / Vacaciones y permisos"
        },

        nomina: {
            title: "Nómina",
            breadcrumb: "RH / Nómina"
        },

        usuarios: {
            title: "Usuarios",
            breadcrumb: "Administración / Usuarios"
        },

        "roles-permisos": {
            title: "Roles y permisos",
            breadcrumb: "Administración / Roles y permisos"
        },

        configuracion: {
            title: "Configuración",
            breadcrumb: "Administración / Configuración"
        },

        auditoria: {
            title: "Auditoría",
            breadcrumb: "Administración / Auditoría"
        }
    };


    /* =====================================================
       3. ESTADO GLOBAL DE LA APLICACIÓN
       ===================================================== */

    const appState = {
        currentPage: "dashboard",
        sidebarCollapsed: false,
        activeMenu: null,
        notificationsOpen: false,
        profileOpen: false,
        modalOpen: false
    };


    /* =====================================================
       4. NAVEGACIÓN ENTRE PÁGINAS
       ===================================================== */

    function navigateTo(page) {

        if (!page) {
            return;
        }

        const targetPage = document.getElementById(`page-${page}`);

        if (!targetPage) {
            console.warn(`No existe el contenedor de la página: page-${page}`);
            return;
        }

        /* ---------------------------------------------
           Ocultar todas las páginas
           --------------------------------------------- */

        const allPages = document.querySelectorAll("[data-page-view]");

        allPages.forEach((pageElement) => {
            pageElement.hidden = true;
            pageElement.classList.remove("active");
        });


        /* ---------------------------------------------
           Mostrar página seleccionada
           --------------------------------------------- */

        targetPage.hidden = false;
        targetPage.classList.add("active");


        /* ---------------------------------------------
           Actualizar estado
           --------------------------------------------- */

        appState.currentPage = page;


        /* ---------------------------------------------
           Actualizar título y breadcrumb
           --------------------------------------------- */

        const config = pageConfig[page];

        if (config) {

            if (pageTitle) {
                pageTitle.textContent = config.title;
            }

            if (breadcrumbSection) {
                breadcrumbSection.textContent = config.breadcrumb;
            }

        } else {

            if (pageTitle) {
                pageTitle.textContent = page;
            }

            if (breadcrumbSection) {
                breadcrumbSection.textContent = page;
            }
        }


        /* ---------------------------------------------
           Actualizar navegación activa
           --------------------------------------------- */

        updateActiveNavigation(page);


        /* ---------------------------------------------
           Cerrar paneles abiertos
           --------------------------------------------- */

        closeNotificationPanel();
        closeProfileMenu();


        /* ---------------------------------------------
           En móviles, cerrar sidebar
           --------------------------------------------- */

        if (window.innerWidth <= 900) {
            closeSidebar();
        }


        /* ---------------------------------------------
           Actualizar URL interna
           --------------------------------------------- */

        try {
            const newUrl = `${window.location.pathname}#${page}`;

            window.history.replaceState(
                {
                    page: page
                },
                "",
                newUrl
            );
        } catch (error) {
            console.warn("No fue posible actualizar la URL.", error);
        }


        /* ---------------------------------------------
           Evento personalizado
           --------------------------------------------- */

        document.dispatchEvent(
            new CustomEvent("turistaran:navigation", {
                detail: {
                    page: page
                }
            })
        );
    }


    /* =====================================================
       5. NAVEGACIÓN ACTIVA
       ===================================================== */

    function updateActiveNavigation(page) {

        const navItems = document.querySelectorAll(
            ".nav-item[data-page]"
        );

        navItems.forEach((item) => {
            item.classList.remove("active");
        });


        const activeItems = document.querySelectorAll(
            `.nav-item[data-page="${page}"]`
        );

        activeItems.forEach((item) => {
            item.classList.add("active");
        });


        /* ---------------------------------------------
           Marcar también la sección correspondiente
           --------------------------------------------- */

        const sectionMap = {
            leads: "ventas",
            clientes: "ventas",
            cotizaciones: "ventas",
            seguimientos: "ventas",
            oportunidades: "ventas",

            proveedores: "compras",
            "solicitudes-compra": "compras",
            "ordenes-compra": "compras",
            recepciones: "compras",
            inventario: "compras",
            "three-way-matching": "compras",

            proyectos: "proyectos",
            tareas: "proyectos",
            progreso: "proyectos",
            "materiales-proyecto": "proyectos",
            "costos-proyecto": "proyectos",

            finanzas: "finanzas",
            contabilidad: "finanzas",
            "cuentas-cobrar": "finanzas",
            "cuentas-pagar": "finanzas",
            costeo: "finanzas",
            "reportes-financieros": "finanzas",
            proyecciones: "finanzas",

            personal: "rh",
            asistencias: "rh",
            contrataciones: "rh",
            "vacaciones-permisos": "rh",
            nomina: "rh",

            usuarios: "administracion",
            "roles-permisos": "administracion",
            configuracion: "administracion",
            auditoria: "administracion"
        };


        const section = sectionMap[page];

        if (section) {

            const sectionButton = document.querySelector(
                `[data-menu="${section}"]`
            );

            if (sectionButton) {

                const menuContainer =
                    sectionButton.closest(".nav-section");

                if (menuContainer) {
                    menuContainer.classList.add("open");
                }
            }
        }
    }


    /* =====================================================
       6. MANEJO DE SUBMENÚS
       ===================================================== */

    function toggleSubmenu(menuName) {

        const menuButton = document.querySelector(
            `[data-menu="${menuName}"]`
        );

        if (!menuButton) {
            return;
        }

        const section = menuButton.closest(".nav-section");

        if (!section) {
            return;
        }

        const isOpen = section.classList.contains("open");


        /* ---------------------------------------------
           Cerrar otros submenús
           --------------------------------------------- */

        document.querySelectorAll(".nav-section.open").forEach((item) => {

            if (item !== section) {
                item.classList.remove("open");

                const button =
                    item.querySelector("[data-menu]");

                if (button) {
                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        });


        /* ---------------------------------------------
           Alternar actual
           --------------------------------------------- */

        section.classList.toggle("open", !isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        appState.activeMenu = !isOpen
            ? menuName
            : null;
    }


    /* =====================================================
       7. SIDEBAR
       ===================================================== */

    function toggleSidebar() {

        if (!sidebar) {
            return;
        }

        appState.sidebarCollapsed =
            !appState.sidebarCollapsed;

        sidebar.classList.toggle(
            "sidebar-collapsed",
            appState.sidebarCollapsed
        );

        document.body.classList.toggle(
            "sidebar-is-collapsed",
            appState.sidebarCollapsed
        );
    }


    function closeSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("sidebar-mobile-open");

        document.body.classList.remove(
            "sidebar-mobile-is-open"
        );
    }


    function openSidebarMobile() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add(
            "sidebar-mobile-open"
        );

        document.body.classList.add(
            "sidebar-mobile-is-open"
        );
    }


    /* =====================================================
       8. NOTIFICACIONES
       ===================================================== */

    function openNotificationPanel() {

        if (!notificationPanel) {
            return;
        }

        notificationPanel.hidden = false;

        notificationPanel.classList.add("open");

        appState.notificationsOpen = true;

        closeProfileMenu();
    }


    function closeNotificationPanel() {

        if (!notificationPanel) {
            return;
        }

        notificationPanel.classList.remove("open");

        notificationPanel.hidden = true;

        appState.notificationsOpen = false;
    }


    function toggleNotificationPanel() {

        if (appState.notificationsOpen) {
            closeNotificationPanel();
        } else {
            openNotificationPanel();
        }
    }


    /* =====================================================
       9. MENÚ DE PERFIL
       ===================================================== */

    function openProfileMenu() {

        if (!profileMenu) {
            return;
        }

        profileMenu.hidden = false;

        profileMenu.classList.add("open");

        appState.profileOpen = true;

        closeNotificationPanel();
    }


    function closeProfileMenu() {

        if (!profileMenu) {
            return;
        }

        profileMenu.classList.remove("open");

        profileMenu.hidden = true;

        appState.profileOpen = false;
    }


    function toggleProfileMenu() {

        if (appState.profileOpen) {
            closeProfileMenu();
        } else {
            openProfileMenu();
        }
    }


    /* =====================================================
       10. MODALES
       ===================================================== */

    function openModal(options = {}) {

        if (!globalModal) {
            return;
        }

        const {
            title = "Ventana",
            content = "",
            size = "medium"
        } = options;


        globalModal.hidden = false;

        globalModal.classList.add("open");

        globalModal.dataset.size = size;

        globalModal.innerHTML = `
            <div class="modal-backdrop" data-modal-close></div>

            <div class="modal-dialog modal-${size}" role="dialog" aria-modal="true">

                <div class="modal-header">

                    <div class="modal-title-wrapper">
                        <h2 class="modal-title">
                            ${escapeHTML(title)}
                        </h2>
                    </div>

                    <button
                        type="button"
                        class="modal-close"
                        aria-label="Cerrar"
                        data-modal-close
                    >
                        ×
                    </button>

                </div>

                <div class="modal-body">
                    ${content}
                </div>

            </div>
        `;

        appState.modalOpen = true;

        document.body.classList.add("modal-is-open");
    }


    function closeModal() {

        if (!globalModal) {
            return;
        }

        globalModal.classList.remove("open");

        globalModal.hidden = true;

        globalModal.innerHTML = "";

        appState.modalOpen = false;

        document.body.classList.remove(
            "modal-is-open"
        );
    }


    /* =====================================================
       11. ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       12. BÚSQUEDA GLOBAL
       ===================================================== */

    function performGlobalSearch(value) {

        const searchTerm = value
            .trim()
            .toLowerCase();

        if (!searchTerm) {
            return;
        }


        /*
         * Por ahora la búsqueda revisa elementos visibles
         * que tengan data-searchable.
         *
         * Más adelante se conectará directamente con:
         * Leads
         * Clientes
         * Cotizaciones
         * Proyectos
         * Productos
         * Proveedores
         * etc.
         */

        const searchableElements =
            document.querySelectorAll(
                "[data-searchable]"
            );

        let firstMatch = null;

        searchableElements.forEach((element) => {

            const text =
                element.textContent.toLowerCase();

            const matches =
                text.includes(searchTerm);

            element.classList.toggle(
                "search-match",
                matches
            );

            if (matches && !firstMatch) {
                firstMatch = element;
            }
        });


        if (firstMatch) {

            firstMatch.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            showToast(
                `No se encontraron resultados para "${value}".`,
                "info"
            );
        }
    }


    /* =====================================================
       13. TOAST / MENSAJES
       ===================================================== */

    function showToast(message, type = "info") {

        let toastContainer =
            document.getElementById(
                "toast-container"
            );


        if (!toastContainer) {

            toastContainer =
                document.createElement("div");

            toastContainer.id =
                "toast-container";

            toastContainer.className =
                "toast-container";

            document.body.appendChild(
                toastContainer
            );
        }


        const toast =
            document.createElement("div");

        toast.className =
            `toast toast-${type}`;

        toast.innerHTML = `
            <div class="toast-message">
                ${escapeHTML(message)}
            </div>

            <button
                type="button"
                class="toast-close"
                aria-label="Cerrar"
            >
                ×
            </button>
        `;


        toastContainer.appendChild(toast);


        const closeButton =
            toast.querySelector(".toast-close");


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {
                    removeToast(toast);
                }
            );
        }


        setTimeout(() => {
            removeToast(toast);
        }, 4500);
    }


    function removeToast(toast) {

        if (!toast) {
            return;
        }

        toast.classList.add("removing");

        setTimeout(() => {

            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }

        }, 250);
    }


    /* =====================================================
       14. EVENTOS DE NAVEGACIÓN
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            /* -----------------------------------------
               Navegación mediante data-page
               ----------------------------------------- */

            const navigationTarget =
                event.target.closest(
                    "[data-page]"
                );


            if (
                navigationTarget &&
                !navigationTarget.hasAttribute(
                    "data-menu"
                )
            ) {

                const page =
                    navigationTarget.dataset.page;

                navigateTo(page);

                return;
            }


            /* -----------------------------------------
               Submenús
               ----------------------------------------- */

            const menuTarget =
                event.target.closest(
                    "[data-menu]"
                );


            if (menuTarget) {

                const menu =
                    menuTarget.dataset.menu;

                toggleSubmenu(menu);

                return;
            }


            /* -----------------------------------------
               Cerrar modal
               ----------------------------------------- */

            const modalClose =
                event.target.closest(
                    "[data-modal-close]"
                );


            if (modalClose) {
                closeModal();
            }
        }
    );


    /* =====================================================
       15. SIDEBAR TOGGLE
       ===================================================== */

    if (sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            () => {

                if (window.innerWidth <= 900) {

                    if (
                        sidebar &&
                        sidebar.classList.contains(
                            "sidebar-mobile-open"
                        )
                    ) {
                        closeSidebar();
                    } else {
                        openSidebarMobile();
                    }

                } else {

                    toggleSidebar();
                }
            }
        );
    }


    /* =====================================================
       16. NOTIFICACIONES
       ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleNotificationPanel();
            }
        );
    }


    /* =====================================================
       17. PERFIL
       ===================================================== */

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleProfileMenu();
            }
        );
    }


    /* =====================================================
       18. BÚSQUEDA
       ===================================================== */

    if (globalSearch) {

        globalSearch.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performGlobalSearch(
                        globalSearch.value
                    );
                }
            }
        );
    }


    /* =====================================================
       19. CERRAR PANELES AL HACER CLICK AFUERA
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            /* -----------------------------------------
               Perfil
               ----------------------------------------- */

            if (
                appState.profileOpen &&
                profileMenu &&
                !profileMenu.contains(event.target) &&
                profileButton &&
                !profileButton.contains(event.target)
            ) {
                closeProfileMenu();
            }


            /* -----------------------------------------
               Notificaciones
               ----------------------------------------- */

            if (
                appState.notificationsOpen &&
                notificationPanel &&
                !notificationPanel.contains(event.target) &&
                notificationButton &&
                !notificationButton.contains(event.target)
            ) {
                closeNotificationPanel();
            }
        }
    );


    /* =====================================================
       20. TECLA ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            closeNotificationPanel();
            closeProfileMenu();

            if (appState.modalOpen) {
                closeModal();
            }
        }
    );


    /* =====================================================
       21. CONTROL DE VENTANA
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {
                closeSidebar();
            }
        }
    );


    /* =====================================================
       22. NAVEGACIÓN MEDIANTE HASH
       ===================================================== */

    function loadPageFromHash() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        if (
            hash &&
            pageConfig[hash] &&
            document.getElementById(`page-${hash}`)
        ) {

            navigateTo(hash);

        } else {

            navigateTo("dashboard");
        }
    }


    window.addEventListener(
        "hashchange",
        loadPageFromHash
    );


    /* =====================================================
       23. INICIALIZACIÓN
       ===================================================== */

    function initializeApp() {

        /* -----------------------------------------
           Ocultar todas las páginas
           ----------------------------------------- */

        document
            .querySelectorAll("[data-page-view]")
            .forEach((page) => {
                page.hidden = true;
                page.classList.remove("active");
            });


        /* -----------------------------------------
           Inicializar paneles
           ----------------------------------------- */

        if (notificationPanel) {
            notificationPanel.hidden = true;
        }

        if (profileMenu) {
            profileMenu.hidden = true;
        }

        if (globalModal) {
            globalModal.hidden = true;
        }


        /* -----------------------------------------
           Cargar página
           ----------------------------------------- */

        loadPageFromHash();


        /* -----------------------------------------
           Exponer funciones principales
           ----------------------------------------- */

        window.Turistaran = {

            navigateTo,
            openModal,
            closeModal,

            showToast,

            openNotificationPanel,
            closeNotificationPanel,

            openProfileMenu,
            closeProfileMenu,

            toggleSidebar,

            state: appState,

            pageConfig
        };


        console.log(
            "Turistarán ERP & CRM inicializado correctamente."
        );
    }


    

    /* =====================================================
       24. ARRANCAR APLICACIÓN
       ===================================================== */

     /* =========================================================
    ALMACENAMIENTO COMPARTIDO DEL ERP
    Base para conectar módulos entre sí
    ========================================================= */

const turistaranStorage = {

    get(key, defaultValue = []) {

        try {

            const stored =
                localStorage.getItem(key);

            if (!stored) {
                return defaultValue;
            }

            return JSON.parse(stored);

        } catch (error) {

            console.error(
                `Error al leer ${key}:`,
                error
            );

            return defaultValue;
        }
    },


    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                `Error al guardar ${key}:`,
                error
            );

            return false;
        }
    },


    remove(key) {

        try {

            localStorage.removeItem(key);

        } catch (error) {

            console.error(
                `Error al eliminar ${key}:`,
                error
            );
        }
    }

};


/* =========================================================
   CLAVES DE DATOS DEL ERP
   ========================================================= */

const ERP_STORAGE_KEYS = {

    leads: "turistaran_leads",

    clientes: "turistaran_clientes",

    proyectos: "turistaran_proyectos",

    cotizaciones: "turistaran_cotizaciones",

    seguimientos: "turistaran_seguimientos",

    proveedores: "turistaran_proveedores",

    solicitudesCompra: "turistaran_solicitudes_compra",

    ordenesCompra: "turistaran_ordenes_compra",

    recepciones: "turistaran_recepciones",

    inventario: "turistaran_inventario",

    matching: "turistaran_matching",

    finanzas: "turistaran_finanzas",

    cuentasPorCobrar: "turistaran_cxc",

    cuentasPorPagar: "turistaran_cxp",

    contabilidad: "turistaran_contabilidad",

    proyecciones: "turistaran_proyecciones",

    personal: "turistaran_personal",

    asistencias: "turistaran_asistencias",

    contrataciones: "turistaran_contrataciones",

    nomina: "turistaran_nomina"

};   


/* =========================================================
   MÓDULO: LEADS
   3.3 - Gestión básica de Leads
   ========================================================= */

const leadsStorageKey = "turistaran_leads";

let leadsData = [];
let leadsCurrentPage = 1;
const leadsItemsPerPage = 10;


/* =========================================================
   DATOS INICIALES
   ========================================================= */

function loadLeads() {
    try {
        const storedLeads = localStorage.getItem(leadsStorageKey);

        if (storedLeads) {
            leadsData = JSON.parse(storedLeads);
        } else {
            leadsData = [];
        }

    } catch (error) {
        console.error("Error al cargar leads:", error);
        leadsData = [];
    }

    renderLeads();
}


/* =========================================================
   GUARDAR LEADS
   ========================================================= */

function saveLeads() {
    try {
        localStorage.setItem(
            leadsStorageKey,
            JSON.stringify(leadsData)
        );
    } catch (error) {
        console.error("Error al guardar leads:", error);
    }
}


/* =========================================================
   GENERAR ID
   ========================================================= */

function generateLeadId() {
    return "LEAD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

/* =========================================================
   GENERADORES DE IDs
   ========================================================= */

function generateClientId() {

    return (
        "CLI-" +
        Date.now() +
        "-" +
        Math.floor(Math.random() * 1000)
    );
}


function generateProjectId() {

    return (
        "PROY-" +
        Date.now() +
        "-" +
        Math.floor(Math.random() * 1000)
    );
}


/* =========================================================
   CONVERTIR LEAD EN CLIENTE
   ========================================================= */

function convertLeadToClientAndProject(lead) {

    if (!lead) {
        return null;
    }


    /* =====================================================
       OBTENER CLIENTES EXISTENTES
       ===================================================== */

    let clientes =
        turistaranStorage.get(
            ERP_STORAGE_KEYS.clientes,
            []
        );


    /* =====================================================
       EVITAR DUPLICADOS
       ===================================================== */

    const existingClient =
        clientes.find(client => {

            if (
                lead.email &&
                client.email
            ) {
                return (
                    client.email.toLowerCase() ===
                    lead.email.toLowerCase()
                );
            }

            return (
                client.company &&
                lead.company &&
                client.company.toLowerCase() ===
                lead.company.toLowerCase()
            );
        });


    let client;


    /* =====================================================
       SI YA EXISTE EL CLIENTE
       ===================================================== */

    if (existingClient) {

        client = existingClient;

    } else {

        client = {

            id: generateClientId(),

            sourceLeadId: lead.id,

            company: lead.company || "",

            industry: lead.industry || "",

            city: lead.city || "",

            contactName: lead.contactName || "",

            position: lead.position || "",

            phone: lead.phone || "",

            email: lead.email || "",

            responsible:
                lead.responsible || "",

            notes:
                lead.notes || "",

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()
        };


        clientes.unshift(client);

        turistaranStorage.set(
            ERP_STORAGE_KEYS.clientes,
            clientes
        );
    }


    /* =====================================================
       CREAR PROYECTO
       ===================================================== */

    let proyectos =
        turistaranStorage.get(
            ERP_STORAGE_KEYS.proyectos,
            []
        );


    const existingProject =
        proyectos.find(
            project =>
                project.sourceLeadId === lead.id ||
                project.clientId === client.id
        );


    let project;


    if (existingProject) {

        project = existingProject;

    } else {

        project = {

            id: generateProjectId(),

            sourceLeadId: lead.id,

            clientId: client.id,

            clientName:
                client.company,

            name:
                `Proyecto - ${client.company}`,

            status:
                "nuevo",

            progress:
                0,

            responsible:
                lead.responsible || "",

            description:
                `Proyecto creado automáticamente a partir del Lead ${lead.id}.`,

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()
        };


        proyectos.unshift(project);

        turistaranStorage.set(
            ERP_STORAGE_KEYS.proyectos,
            proyectos
        );
    }


    /* =====================================================
       RELACIONAR PROYECTO CON CLIENTE
       ===================================================== */

    if (!client.projectIds) {

        client.projectIds = [];
    }


    if (
        !client.projectIds.includes(
            project.id
        )
    ) {

        client.projectIds.push(
            project.id
        );

        client.updatedAt =
            new Date().toISOString();


        const clientIndex =
            clientes.findIndex(
                item =>
                    item.id === client.id
            );


        if (clientIndex !== -1) {

            clientes[clientIndex] =
                client;

            turistaranStorage.set(
                ERP_STORAGE_KEYS.clientes,
                clientes
            );
        }
    }


    /* =====================================================
       RESULTADO
       ===================================================== */

    return {

        client,

        project
    };
}

/* =========================================================
   ESCAPAR HTML
   Evita insertar directamente contenido introducido
   por el usuario dentro del HTML.
   ========================================================= */

function escapeLeadHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   ETIQUETAS
   ========================================================= */

function getLeadStatusLabel(status) {

    const labels = {
        "sin-contactar": "Sin contactar",
        "no-contesto": "No contestó",
        "cotizacion": "Cotización",
        "ya-cliente": "Ya cliente"
    };

    return labels[status] || status || "Sin estado";
}


function getLeadSourceLabel(source) {

    const labels = {
        "web": "Sitio web",
        "referido": "Referido",
        "redes-sociales": "Redes sociales",
        "llamada": "Llamada",
        "correo": "Correo",
        "prospeccion": "Prospección",
        "otro": "Otro"
    };

    return labels[source] || source || "—";
}


/* =========================================================
   CLASE VISUAL DEL ESTADO
   ========================================================= */

function getLeadStatusClass(status) {

    const classes = {
        "sin-contactar": "status-neutral",
        "no-contesto": "status-warning",
        "cotizacion": "status-info",
        "ya-cliente": "status-success"
    };

    return classes[status] || "status-neutral";
}


/* =========================================================
   FORMATO DE FECHA
   ========================================================= */

function formatLeadDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}


/* =========================================================
   FILTROS
   ========================================================= */

function getFilteredLeads() {

    const searchInput = document.getElementById("leads-search");
    const statusFilter = document.getElementById("leads-status-filter");
    const sourceFilter = document.getElementById("leads-source-filter");

    const search = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const status = statusFilter
        ? statusFilter.value
        : "";

    const source = sourceFilter
        ? sourceFilter.value
        : "";

    return leadsData.filter(lead => {

        const searchableText = [
            lead.company,
            lead.contactName,
            lead.phone,
            lead.email,
            lead.city,
            lead.industry,
            lead.position
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !search ||
            searchableText.includes(search);

        const matchesStatus =
            !status ||
            lead.status === status;

        const matchesSource =
            !source ||
            lead.source === source;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesSource
        );
    });
}


/* =========================================================
   RENDER DE LEADS
   ========================================================= */

function renderLeads() {

    const tableBody = document.getElementById("leads-table-body");
    const emptyState = document.getElementById("leads-empty-state");

    if (!tableBody || !emptyState) {
        return;
    }

    const filteredLeads = getFilteredLeads();

    const totalPages = Math.max(
        1,
        Math.ceil(filteredLeads.length / leadsItemsPerPage)
    );

    if (leadsCurrentPage > totalPages) {
        leadsCurrentPage = totalPages;
    }

    const startIndex =
        (leadsCurrentPage - 1) * leadsItemsPerPage;

    const paginatedLeads =
        filteredLeads.slice(
            startIndex,
            startIndex + leadsItemsPerPage
        );


    tableBody.innerHTML = "";


    /* =====================================================
       ESTADO VACÍO
       ===================================================== */

    if (filteredLeads.length === 0) {

        tableBody.innerHTML = "";

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;


        paginatedLeads.forEach(lead => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="table-primary-text">
                        ${escapeLeadHTML(lead.company)}
                    </div>

                    <div class="table-secondary-text">
                        ${escapeLeadHTML(lead.contactName)}
                    </div>
                </td>

                <td>
                    <div class="table-secondary-text">
                        ${escapeLeadHTML(lead.phone || "Sin teléfono")}
                    </div>

                    <div class="table-secondary-text">
                        ${escapeLeadHTML(lead.email || "Sin correo")}
                    </div>
                </td>

                <td>
                    ${escapeLeadHTML(
                        getLeadSourceLabel(lead.source)
                    )}
                </td>

                <td>
                    <span class="status-badge ${getLeadStatusClass(lead.status)}">
                        ${escapeLeadHTML(
                            getLeadStatusLabel(lead.status)
                        )}
                    </span>
                </td>

                <td>
                    ${formatLeadDate(lead.lastContact)}
                </td>

                <td>
                    ${formatLeadDate(lead.nextFollowup)}
                </td>

                <td>
                    ${escapeLeadHTML(
                        lead.responsible || "Sin asignar"
                    )}
                </td>

                <td>
                    <div class="table-actions">

                        <button
                            type="button"
                            class="table-action-button"
                            data-lead-action="edit"
                            data-lead-id="${escapeLeadHTML(lead.id)}"
                            title="Editar lead"
                        >
                            ✎
                        </button>

                        <button
                            type="button"
                            class="table-action-button danger"
                            data-lead-action="delete"
                            data-lead-id="${escapeLeadHTML(lead.id)}"
                            title="Eliminar lead"
                        >
                            ×
                        </button>

                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }


    updateLeadStatistics(filteredLeads);
    updateLeadPagination(filteredLeads);
}


/* =========================================================
   ESTADÍSTICAS
   ========================================================= */

function updateLeadStatistics() {

    const totalElement =
        document.getElementById("leads-total-count");

    const uncontactedElement =
        document.getElementById("leads-uncontacted-count");

    const quoteElement =
        document.getElementById("leads-quote-count");

    const convertedElement =
        document.getElementById("leads-converted-count");


    if (totalElement) {
        totalElement.textContent = leadsData.length;
    }

    if (uncontactedElement) {

        uncontactedElement.textContent =
            leadsData.filter(
                lead => lead.status === "sin-contactar"
            ).length;
    }

    if (quoteElement) {

        quoteElement.textContent =
            leadsData.filter(
                lead => lead.status === "cotizacion"
            ).length;
    }

    if (convertedElement) {

        convertedElement.textContent =
            leadsData.filter(
                lead => lead.status === "ya-cliente"
            ).length;
    }
}


/* =========================================================
   PAGINACIÓN
   ========================================================= */

function updateLeadPagination(filteredLeads) {

    const totalPages = Math.max(
        1,
        Math.ceil(filteredLeads.length / leadsItemsPerPage)
    );

    const previousButton =
        document.getElementById("leads-prev-page");

    const nextButton =
        document.getElementById("leads-next-page");

    const currentPage =
        document.getElementById("leads-current-page");

    const resultsInfo =
        document.getElementById("leads-results-info");


    if (currentPage) {
        currentPage.textContent = leadsCurrentPage;
    }


    if (previousButton) {
        previousButton.disabled =
            leadsCurrentPage <= 1;
    }


    if (nextButton) {
        nextButton.disabled =
            leadsCurrentPage >= totalPages;
    }


    if (resultsInfo) {

        if (filteredLeads.length === 0) {

            resultsInfo.textContent =
                "Mostrando 0 leads";

        } else {

            const start =
                ((leadsCurrentPage - 1) * leadsItemsPerPage) + 1;

            const end =
                Math.min(
                    leadsCurrentPage * leadsItemsPerPage,
                    filteredLeads.length
                );

            resultsInfo.textContent =
                `Mostrando ${start}-${end} de ${filteredLeads.length} leads`;
        }
    }
}


/* =========================================================
   ABRIR MODAL DE LEAD
   ========================================================= */

function openLeadModal(lead = null) {

    const modal =
        document.getElementById("lead-form-modal");

    const form =
        document.getElementById("lead-form");

    const title =
        document.getElementById("lead-form-modal-title");


    if (!modal || !form) {
        return;
    }


    form.reset();


    const leadId =
        document.getElementById("lead-id");

    if (leadId) {
        leadId.value = lead ? lead.id : "";
    }


    if (title) {
        title.textContent =
            lead ? "Editar lead" : "Nuevo lead";
    }


    if (lead) {

        document.getElementById("lead-company").value =
            lead.company || "";

        document.getElementById("lead-industry").value =
            lead.industry || "";

        document.getElementById("lead-city").value =
            lead.city || "";

        document.getElementById("lead-source").value =
            lead.source || "";

        document.getElementById("lead-contact-name").value =
            lead.contactName || "";

        document.getElementById("lead-position").value =
            lead.position || "";

        document.getElementById("lead-phone").value =
            lead.phone || "";

        document.getElementById("lead-email").value =
            lead.email || "";

        document.getElementById("lead-status").value =
            lead.status || "sin-contactar";

        document.getElementById("lead-responsible").value =
            lead.responsible || "";

        document.getElementById("lead-last-contact").value =
            lead.lastContact || "";

        document.getElementById("lead-next-followup").value =
            lead.nextFollowup || "";

        document.getElementById("lead-notes").value =
            lead.notes || "";
    }


    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");


    setTimeout(() => {

        const companyInput =
            document.getElementById("lead-company");

        if (companyInput) {
            companyInput.focus();
        }

    }, 50);
}


/* =========================================================
   CERRAR MODAL
   ========================================================= */

function closeLeadModal() {

    const modal =
        document.getElementById("lead-form-modal");

    if (!modal) {
        return;
    }

    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   OBTENER DATOS DEL FORMULARIO
   ========================================================= */

function getLeadFormData() {

    return {

        company:
            document.getElementById("lead-company")?.value.trim() || "",

        industry:
            document.getElementById("lead-industry")?.value.trim() || "",

        city:
            document.getElementById("lead-city")?.value.trim() || "",

        source:
            document.getElementById("lead-source")?.value || "",

        contactName:
            document.getElementById("lead-contact-name")?.value.trim() || "",

        position:
            document.getElementById("lead-position")?.value.trim() || "",

        phone:
            document.getElementById("lead-phone")?.value.trim() || "",

        email:
            document.getElementById("lead-email")?.value.trim() || "",

        status:
            document.getElementById("lead-status")?.value || "sin-contactar",

        responsible:
            document.getElementById("lead-responsible")?.value.trim() || "",

        lastContact:
            document.getElementById("lead-last-contact")?.value || "",

        nextFollowup:
            document.getElementById("lead-next-followup")?.value || "",

        notes:
            document.getElementById("lead-notes")?.value.trim() || ""
    };
}


/* =========================================================
   CREAR / ACTUALIZAR LEAD
   ========================================================= */

/* =========================================================
   CALCULAR PRÓXIMO SEGUIMIENTO
   Regla Turistarán:
   "No contestó" = seguimiento automático en 10 días
   ========================================================= */

function calculateLeadFollowupDate(lastContact) {

    let baseDate;

    if (lastContact) {
        baseDate = new Date(lastContact + "T00:00:00");
    } else {
        baseDate = new Date();
    }

    if (Number.isNaN(baseDate.getTime())) {
        baseDate = new Date();
    }

    baseDate.setDate(baseDate.getDate() + 10);

    const year = baseDate.getFullYear();
    const month = String(
        baseDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        baseDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/* =========================================================
   CREAR / ACTUALIZAR LEAD
   ========================================================= */

function saveLeadFromForm(event) {

    event.preventDefault();

    const leadId =
        document.getElementById("lead-id")?.value || "";

    const formData =
        getLeadFormData();


    /* =====================================================
       VALIDACIÓN
       ===================================================== */

    if (!formData.company || !formData.contactName) {

        showToast(
            "Completa los campos obligatorios.",
            "warning"
        );

        return;
    }


    /* =====================================================
       AUTOMATIZACIÓN:
       NO CONTESTÓ → +10 DÍAS
       ===================================================== */

    if (formData.status === "no-contesto") {

        formData.nextFollowup =
            calculateLeadFollowupDate(
                formData.lastContact
            );
    }


    /* =====================================================
       SI CAMBIA DE "NO CONTESTÓ" A OTRO ESTADO
       NO DEJAMOS UNA FECHA AUTOMÁTICA ANTIGUA.
       ===================================================== */

    if (
        formData.status !== "no-contesto" &&
        leadId
    ) {

        const existingLead =
            leadsData.find(
                lead => lead.id === leadId
            );

        if (
            existingLead &&
            existingLead.status === "no-contesto" &&
            !formData.nextFollowup
        ) {
            formData.nextFollowup = "";
        }
    }


    /* =====================================================
       EDITAR
       ===================================================== */

    if (leadId) {

        const index =
            leadsData.findIndex(
                lead => lead.id === leadId
            );


        if (index !== -1) {

            leadsData[index] = {

                ...leadsData[index],

                ...formData,

                updatedAt:
                    new Date().toISOString()
            };

            saveLeads();

            renderLeads();

            closeLeadModal();

            showToast(
                "Lead actualizado correctamente.",
                "success"
            );

            return;
        }
    }


    /* =====================================================
       CREAR
       ===================================================== */

    const newLead = {

        id: generateLeadId(),

        ...formData,

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()
    };


    leadsData.unshift(newLead);

    saveLeads();

    leadsCurrentPage = 1;

    renderLeads();

    closeLeadModal();


    showToast(
        "Lead creado correctamente.",
        "success"
    );
}


/* =========================================================
   ELIMINAR LEAD
   ========================================================= */

function deleteLead(leadId) {

    const lead =
        leadsData.find(
            item => item.id === leadId
        );


    if (!lead) {
        return;
    }


    const confirmed =
        window.confirm(
            `¿Deseas eliminar el lead de "${lead.company}"?`
        );


    if (!confirmed) {
        return;
    }


    leadsData =
        leadsData.filter(
            item => item.id !== leadId
        );


    saveLeads();

    renderLeads();


    showToast(
        "Lead eliminado correctamente.",
        "success"
    );
}


/* =========================================================
   EVENTOS DEL MÓDULO
   ========================================================= */

function initializeLeadsModule() {

    const newLeadButton =
        document.getElementById("new-lead-button");

    const emptyNewLeadButton =
        document.getElementById("empty-new-lead-button");

    const closeModalButton =
        document.getElementById("close-lead-modal");

    const cancelButton =
        document.getElementById("cancel-lead-form");

    const modal =
        document.getElementById("lead-form-modal");

    const form =
        document.getElementById("lead-form");

    const searchInput =
        document.getElementById("leads-search");

    const statusFilter =
        document.getElementById("leads-status-filter");

    const sourceFilter =
        document.getElementById("leads-source-filter");

    const previousButton =
        document.getElementById("leads-prev-page");

    const nextButton =
        document.getElementById("leads-next-page");

    const tableBody =
        document.getElementById("leads-table-body");


    if (newLeadButton) {

        newLeadButton.addEventListener(
            "click",
            () => openLeadModal()
        );
    }


    if (emptyNewLeadButton) {

        emptyNewLeadButton.addEventListener(
            "click",
            () => openLeadModal()
        );
    }


    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeLeadModal
        );
    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeLeadModal
        );
    }


    if (modal) {

        const overlay =
            modal.querySelector(
                ".module-modal-overlay"
            );

        if (overlay) {

            overlay.addEventListener(
                "click",
                closeLeadModal
            );
        }
    }


    if (form) {

        form.addEventListener(
            "submit",
            saveLeadFromForm
        );
    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                leadsCurrentPage = 1;

                renderLeads();
            }
        );
    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            () => {

                leadsCurrentPage = 1;

                renderLeads();
            }
        );
    }


    if (sourceFilter) {

        sourceFilter.addEventListener(
            "change",
            () => {

                leadsCurrentPage = 1;

                renderLeads();
            }
        );
    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                if (leadsCurrentPage > 1) {

                    leadsCurrentPage--;

                    renderLeads();
                }
            }
        );
    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                const filteredLeads =
                    getFilteredLeads();

                const totalPages =
                    Math.max(
                        1,
                        Math.ceil(
                            filteredLeads.length /
                            leadsItemsPerPage
                        )
                    );


                if (leadsCurrentPage < totalPages) {

                    leadsCurrentPage++;

                    renderLeads();
                }
            }
        );
    }


    /* =====================================================
       ACCIONES DE LA TABLA
       ===================================================== */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-lead-action]"
                    );


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.leadAction;

                const leadId =
                    button.dataset.leadId;


                if (action === "edit") {

                    const lead =
                        leadsData.find(
                            item => item.id === leadId
                        );

                    if (lead) {
                        openLeadModal(lead);
                    }
                }


                if (action === "delete") {

                    deleteLead(leadId);
                }
            }
        );
    }


    /* =====================================================
       ESC PARA CERRAR MODAL
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                !modal.hidden
            ) {
                closeLeadModal();
            }
        }
    );


    loadLeads();
}


/* =========================================================
   INICIALIZAR LEADS
   ========================================================= */

initializeLeadsModule();

    initializeApp();
});
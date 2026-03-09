import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LayoutDashboard, BarChart3, Package, Settings, HelpCircle, LogOut, Sliders } from 'lucide-react';
import { useDrishti } from '../contexts/DrishtiContext'; // 1. IMPORT THE CONTEXT (Fixed path)

const items = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Simulator', url: '/simulator', icon: Sliders },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Inventory', url: '/inventory', icon: Package },
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Support', url: '/support', icon: HelpCircle },
  { title: 'Logout', url: '/logout', icon: LogOut },
];

// Define a common class for all sidebar buttons
const buttonClassName = "flex items-center gap-3 px-4 py-3 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 w-full";
const activeClassName = "flex items-center gap-3 px-4 py-3 text-sidebar-foreground bg-sidebar-accent w-full";


export const AppSidebar = () => {
  // 2. GET THE FUNCTION FROM THE CONTEXT
  const { toggleSimulator } = useDrishti();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">Drishti</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* --- THIS IS THE FIX --- */}
                  {item.title === 'Simulator' ? (
                    // 3. RENDER A BUTTON FOR THE SIMULATOR
                    <SidebarMenuButton
                      onClick={toggleSimulator}
                      className={buttonClassName} // Use the standard button class
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  ) : (
                    // 4. RENDER NAVLINKS FOR ALL OTHER ITEMS
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive ? activeClassName : buttonClassName
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                  {/* --- END OF FIX --- */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};


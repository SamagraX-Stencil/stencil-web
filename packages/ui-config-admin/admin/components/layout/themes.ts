import { defaultTheme } from "react-admin";
import { createTheme } from '@mui/material';
export const lightTheme = {
  palette: {
    mode: "light" as "light",
  },
  sidebar: {
    width: 260,
    paddingLeft: 6,
  },
  components: {
    ...defaultTheme.components,
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          color: "#FFF",
          backgroundColor: "#343a3f",
          border: "none",
          boxShadow: "0px 0px 10px #000"
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          margin: '4px auto',
          width: '95%',
          color: "rgba(255,255,255,0.6)",
          padding: "0.8rem 0.8rem",
          fontSize: '0.85rem',
          "& svg": {
            height: '1.4rem',
            width: '1.4rem',
            color: "rgba(255,255,255,0.6)"
          },
          "&:hover": {
            background: "#ebedec",
            color: "#343a3f",
            fontWeight: 600,
            borderRadius: 5,
            "& svg": {
              color: "#101a32"
            }
          },
          "&.RaMenuItemLink-active": {
            background: "#ebedec",
            color: "#343a3f",
            fontWeight: 600,
            borderRadius: 5,
            "& svg": {
              color: "#101a32"
            }
          }
        },
      }
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          backgroundColor: "#212528",
          borderRight: '2px solid rgba(17,24,39, 0.1)',
          "& .RaSidebar-paper": {
            background: '#212528'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
        }
      }
    },
    RaLayout: {
      styleOverrides: {
        root: {
          "& .RaLayout-content": {
            background: '#f1f5f9',
            maxHeight: '93vh',
            overflow: 'scroll'
          }
        }
      }
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            padding: '1rem 1rem',
            fontWeight: 'bold',
            color: "#111827"
          },
          "& .RaDatagrid-rowEven": {
            background: "#f0f3ff",
            "&:hover": {
              background: "#f0f3ff"
            }
          },
          "& .RaDatagrid-rowOdd:hover": {
            background: "#fff"
          }
        }
      }
    },
    RaEdit: {
      styleOverrides: {
        root: {
          "& .RaEdit-main": {
            maxHeight: '90vh',
            overflowY: 'scroll'
          }
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        gutters: {
          margin: '0.5rem 0rem'
        }
      }
    }
  },
};

export const darkTheme = {
  palette: {
    mode: "dark" as "dark",
  },
  sidebar: {
    width: 260,
    paddingLeft: 6,
  },
  components: {
    ...defaultTheme.components,
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          color: "#FFF",
          backgroundColor: "#000",
          border: "none",
          boxShadow: "0px 0px 10px #000"
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          margin: '4px auto',
          width: '95%',
          color: "rgba(255,255,255,0.6)",
          padding: "0.8rem 0.8rem",
          fontSize: '0.85rem',
          "& svg": {
            height: '1.4rem',
            width: '1.4rem',
            color: "rgba(255,255,255,0.6)"
          },
          "&:hover": {
            background: "#171717",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 5,
            "& svg": {
              color: "#fff"
            }
          },
          "&.RaMenuItemLink-active": {
            background: "#171717",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 5,
            "& svg": {
              color: "#fff"
            }
          }
        },
      }
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          borderRight: '2px solid rgba(17,24,39, 0.1)',
          "& .RaSidebar-paper": {
            background: '#000'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
        }
      }
    },
    RaLayout: {
      styleOverrides: {
        root: {
          "& .RaLayout-content": {
            background: '#171717',
            maxHeight: '93vh',
            overflowY: 'scroll'
          }
        }
      }
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            padding: '1rem 1rem',
            fontWeight: 'bold',
            color: "#fff",
            background: '#000'
          },
          "& .RaDatagrid-rowEven": {
            background: "#000",
            "&:hover": {
              background: "#171717"
            }
          },
          "& .RaDatagrid-rowOdd": {
            background: "#000",
            "&:hover": {
              background: "#171717"
            }
          }
        }
      }
    },
    RaEdit: {
      styleOverrides: {
        root: {
          "& .RaEdit-main": {
            maxHeight: '93vh',
            overflowY: 'scroll'
          }
        }
      }
    }
  },
};
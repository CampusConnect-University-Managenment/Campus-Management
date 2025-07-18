/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey, primary, secondary } }) =>
              light ? primary.main : secondary.main,
            fontWeight: 'bold',
            fontSize: '1.2rem',
          },
          '& .MuiBreadcrumbs-li': {
            color: ({ palette: { primary, secondary } }) =>
              light ? primary.main : secondary.main,
          },
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MDTypography
            component="span"
            variant="body2"
            color={light ? 'primary' : 'secondary'}
            opacity={1}
            sx={{
              lineHeight: 0,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              background: light
                ? 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)'
                : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el} style={{ textDecoration: 'none' }}>
            <MDTypography
              component="span"
              variant="button"
              fontWeight="bold"
              textTransform="capitalize"
              color={light ? 'primary' : 'secondary'}
              opacity={1}
              sx={{
                lineHeight: 0,
                fontSize: '1.05rem',
                background: light
                  ? 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)'
                  : 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'background 0.3s',
              }}
            >
              {el}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
          color={light ? 'primary' : 'secondary'}
          sx={{
            lineHeight: 0,
            fontSize: '1.1rem',
            background: light
              ? 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)'
              : 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
          }}
        >
          {title.replace("-", " ")}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? 'primary' : 'secondary'}
        noWrap
        sx={{
          mt: 1,
          background: light
            ? 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)'
            : 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title.replace("-", " ")}
      </MDTypography>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;

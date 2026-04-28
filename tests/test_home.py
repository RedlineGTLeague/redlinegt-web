def test_home_loads(page):
    page.goto("https://redlinegt-web.vercel.app/")
    
    assert page.title() != ""

def test_navbar_logo_visible(page):
    page.goto("https://redlinegt-web.vercel.app/")
    
    # logo = page.locator('//nav//img[@alt="Redline GT League"]')

    logo = page.get_by_role("banner").get_by_alt_text("Redline GT League")
    
    assert logo.is_visible()

# def test_navigation_to_reglamento(page):
#     page.goto("https://redlinegt-web.vercel.app/")
    
#     page.get_by_role("banner").get_by_role("link", name="Reglamento").click()
    
#     page.wait_for_url("**/reglamento")

#     assert page.url.endswith("/reglamento")

def test_header_navigation_all_links(page):
    page.goto("https://redlinegt-web.vercel.app/")

    links = {
        "Inicio": "/",
        "Clasificación": "/clasificacion",
        "Calendario": "/calendario",
        "Reglamento": "/reglamento",
    }

    for name, path in links.items():
        page.get_by_role("banner").get_by_role("link", name=name).click()
        page.wait_for_url(f"**{path}")
        assert page.url.endswith(path)
        
        page.goto("https://redlinegt-web.vercel.app/")

def test_footer_navigation_all_links(page):
    page.goto("https://redlinegt-web.vercel.app/")
    
    footer = page.get_by_role("contentinfo")

    links = {
        "Inicio": "/",
        "Clasificación": "/clasificacion",
        "Calendario": "/calendario",
        "Reglamento": "/reglamento",
    }

    for name, path in links.items():
        footer.get_by_role("link", name=name).click()
        page.wait_for_url(f"**{path}")
        assert page.url.endswith(path)
        
        page.goto("https://redlinegt-web.vercel.app/")
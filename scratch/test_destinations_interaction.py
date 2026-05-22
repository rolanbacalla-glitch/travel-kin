import time
from playwright.sync_api import sync_playwright

def run():
    print("Launching browser for interactive verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Set a standard desktop screen size
        page.set_viewport_size({"width": 1280, "height": 800})

        url = "http://localhost:3000/"
        print(f"Navigating to {url}...")
        page.goto(url)
        page.wait_for_load_state("networkidle")

        # Locate Destinations Section
        destinations_sec = page.locator("#destinations")
        destinations_sec.scroll_into_view_if_needed()
        print("Scrolled Destinations section into view.")

        # Find the dots buttons
        dots = page.locator("#destinations button[aria-label^='Go to slide']")
        dot_count = dots.count()
        print(f"Found {dot_count} pagination dots.")

        # Let's inspect the active dot (it has class 'w-8' and 'bg-sunset')
        def get_active_dot_index():
            for i in range(dot_count):
                dot = dots.nth(i)
                classes = dot.evaluate("el => el.className")
                if "w-8" in classes or "bg-sunset" in classes:
                    return i
            return -1

        initial_active = get_active_dot_index()
        print(f"Initial active dot index: {initial_active}")
        if initial_active != 0:
            print("WARNING: Initial active index is not 0!")

        # Find the right scroll button
        right_arrow = page.locator("button[aria-label='Next Destinations']")
        if right_arrow.count() > 0 and right_arrow.is_visible():
            print("Right arrow is visible. Clicking right arrow...")
            right_arrow.click()
            # Wait for scroll and state change
            time.sleep(1)
            new_active = get_active_dot_index()
            print(f"Active index after clicking right arrow: {new_active}")
        else:
            print("Right arrow is not visible or doesn't exist.")

        # Click the 4th dot directly
        target_dot_index = 3
        if target_dot_index < dot_count:
            print(f"Clicking pagination dot {target_dot_index + 1}...")
            dots.nth(target_dot_index).click()
            time.sleep(1.5)
            active_after_click = get_active_dot_index()
            print(f"Active index after clicking dot: {active_after_click}")
            if active_after_click == target_dot_index:
                print("SUCCESS: Dot click successfully scrolled and updated active dot status.")
            else:
                print(f"FAILURE: Active dot index is {active_after_click}, expected {target_dot_index}.")
        else:
            print("Not enough dots to test direct index click.")

        # Click the last dot directly
        last_dot_index = dot_count - 1
        print(f"Clicking last pagination dot {last_dot_index + 1}...")
        dots.nth(last_dot_index).click()
        time.sleep(1.5)
        active_after_last_click = get_active_dot_index()
        print(f"Active index after clicking last dot: {active_after_last_click}")
        if active_after_last_click == last_dot_index:
            print("SUCCESS: Last dot click successfully scrolled and snapped to the end.")
        else:
            print(f"FAILURE: Active dot index is {active_after_last_click}, expected {last_dot_index}.")

        browser.close()

if __name__ == "__main__":
    run()

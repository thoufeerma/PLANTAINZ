import sys
from PIL import Image, ImageDraw

def remove_white_bg(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    
    target_color = (255, 0, 255, 255)
    
    width, height = img.size
    # Flood fill from all 4 corners to catch the white background
    ImageDraw.floodfill(img, (0, 0), target_color, thresh=10)
    ImageDraw.floodfill(img, (width-1, 0), target_color, thresh=10)
    ImageDraw.floodfill(img, (0, height-1), target_color, thresh=10)
    ImageDraw.floodfill(img, (width-1, height-1), target_color, thresh=10)
    
    datas = img.getdata()
    newData = []
    for item in datas:
        if item == target_color:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    remove_white_bg('classic_salted_transparent.png', 'classic_salted_true_transparent.png')
    remove_white_bg('spicy_masala_transparent.png', 'spicy_masala_true_transparent.png')
    print("Done!")

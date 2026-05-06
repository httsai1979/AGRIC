import fs from 'fs';

const filePath = 'src/data/mockData.js';
let content = fs.readFileSync(filePath, 'utf8');

const parseNutrition = (nutritionStr) => {
    if (!nutritionStr) return [];
    const lines = nutritionStr.split('\\n').map(l => l.trim()).filter(l => l);
    const data = [];
    const keywords = ['熱量', '蛋白質', '脂肪', '飽和脂肪', '反式脂肪', '碳水化合物', '糖', '鈉'];
    
    keywords.forEach(key => {
        const idx = lines.findIndex(l => l.includes(key));
        if (idx !== -1) {
            let val = '';
            for (let i = idx + 1; i < lines.length; i++) {
                if (lines[i].match(/[\d.]/) || lines[i].includes('公克') || lines[i].includes('毫克') || lines[i].includes('大卡')) {
                    val = lines[i];
                    break;
                }
                if (keywords.some(k => lines[i].includes(k))) break;
            }
            if (val) data.push({ label: key, value: val });
        }
    });
    return data;
};

// Process PRODUCTS array
const startMarker = 'export const PRODUCTS = [';
const endMarker = '];';
const startIndex = content.indexOf(startMarker);
const endIndex = content.lastIndexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    let productsPart = content.substring(startIndex + startMarker.length, endIndex);
    // Split by product objects
    const productSplit = productsPart.split(/\n\s*\{\s*\n/);
    
    const processedProducts = productSplit.map(block => {
        if (!block.includes('id:')) return block;
        
        let newBlock = block;
        
        // 1. Clean specs (redundant shipping/contact info)
        const specsRegex = /specs:\s*"([\s\S]*?)(?<!\\)"/;
        const specsMatch = newBlock.match(specsRegex);
        if (specsMatch) {
            let specs = specsMatch[1];
            specs = specs.replace(/負責公司：[\\s\\S]*$/g, '')
                         .replace(/地址:[\\s\\S]*$/g, '')
                         .replace(/電話:[\\s\\S]*$/g, '')
                         .replace(/以消費者收受日算起[\\s\\S]*$/g, '')
                         .trim();
            newBlock = newBlock.replace(specsRegex, `specs: "${specs}"`);
        }

        // 2. Extract short_intro
        const introRegex = /intro:\s*"([\s\S]*?)(?<!\\)"/;
        const introMatch = newBlock.match(introRegex);
        if (introMatch) {
            const intro = introMatch[1];
            const firstLine = intro.split('\\n').find(l => l.trim().length > 5) || '';
            const shortIntro = firstLine.replace(/[★🌾🍓🌻💚✨✅]/g, '').trim().substring(0, 45);
            // Remove old short_intro
            newBlock = newBlock.replace(/short_intro:\s*"[\s\S]*?",\n\s*/, '');
            newBlock = newBlock.replace(/intro:\s*"/, `short_intro: "${shortIntro}",\n      intro: "`);
        }

        // 3. Structure nutrition
        const nutritionRegex = /nutrition:\s*"([\s\S]*?)(?<!\\)"/;
        const nutritionMatch = newBlock.match(nutritionRegex);
        if (nutritionMatch) {
            const nutrition = nutritionMatch[1];
            const nutritionData = parseNutrition(nutrition);
            // Remove old nutrition_data
            newBlock = newBlock.replace(/nutrition_data:\s*\[[\s\S]*?\],\n\s*/, '');
            newBlock = newBlock.replace(nutritionRegex, `nutrition: "${nutrition}",\n      nutrition_data: ${JSON.stringify(nutritionData, null, 2).replace(/"/g, "'")}`);
        }

        return newBlock;
    });

    const finalContent = content.substring(0, startIndex + startMarker.length) + 
                         processedProducts.join('\n { \n') + 
                         content.substring(endIndex);
    
    fs.writeFileSync(filePath, finalContent);
    console.log('Final data cleaning completed');
}

import { NextRequest, NextResponse } from 'next/server';
import { askAI } from '../../../lib/services/chatgpt';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, prompt, context } = body;

    if (!type || !prompt) {
      return NextResponse.json(
        { success: false, error: 'Type and prompt are required' },
        { status: 400 }
      );
    }

    if (!process.env.CHATGPT_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

    switch (type) {
      case 'reward_image':
        try {
          const imagePrompt = `A clean, professional game reward icon: ${prompt}. Style: modern game UI icon, 256x256 pixels, clear background, vibrant colors, suitable for battle pass rewards.`;
          
          const response = await client.images.generate({
            model: "dall-e-2",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024"
          });

          const imageUrl = response.data?.[0]?.url;
          if (!imageUrl) {
            throw new Error('No image URL returned from DALL-E');
          }

          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) {
            throw new Error('Failed to fetch generated image');
          }

          const imageBuffer = await imageResponse.arrayBuffer();
          const timestamp = Date.now();
          const filename = `reward_${timestamp}_${Math.random().toString(36).substring(2, 8)}.png`;
          const publicPath = path.join(process.cwd(), 'public', 'battle_pass');
          
          if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath, { recursive: true });
          }

          const filePath = path.join(publicPath, filename);
          fs.writeFileSync(filePath, Buffer.from(imageBuffer));

          const savedImageUrl = `/battle_pass/${filename}`;

          return NextResponse.json({
            success: true,
            data: {
              type,
              prompt,
              result: savedImageUrl,
              originalUrl: imageUrl,
              filename,
              context,
              generatedAt: new Date().toISOString()
            }
          });

        } catch (imageError) {
          console.error('DALL-E generation failed, creating placeholder:', imageError);
          
          const timestamp = Date.now();
          const filename = `placeholder_${timestamp}.png`;
          const placeholderUrl = `https://via.placeholder.com/256x256/6366f1/ffffff?text=${encodeURIComponent(prompt.substring(0, 20))}`;
          
          try {
            const placeholderResponse = await fetch(placeholderUrl);
            const placeholderBuffer = await placeholderResponse.arrayBuffer();
            
            const publicPath = path.join(process.cwd(), 'public', 'battle_pass');
            if (!fs.existsSync(publicPath)) {
              fs.mkdirSync(publicPath, { recursive: true });
            }

            const filePath = path.join(publicPath, filename);
            fs.writeFileSync(filePath, Buffer.from(placeholderBuffer));

            return NextResponse.json({
              success: true,
              data: {
                type,
                prompt,
                result: `/battle_pass/${filename}`,
                isPlaceholder: true,
                context,
                generatedAt: new Date().toISOString()
              }
            });

          } catch (placeholderError) {
            return NextResponse.json({
              success: false,
              error: 'Failed to generate image and create placeholder'
            }, { status: 500 });
          }
        }

      case 'reward_description':
        const systemPrompt = `You are an expert game designer writing reward descriptions for a battle pass system. Create engaging, concise descriptions that make players excited about the reward. Keep descriptions under 100 characters and focus on what makes the reward special or valuable.`;
        
        const result = await askAI({
          prompt,
          systemPrompt,
          model: 'gpt-4.1-mini',
          files: []
        });

        return NextResponse.json({
          success: true,
          data: {
            type,
            prompt,
            result,
            context,
            generatedAt: new Date().toISOString()
          }
        });

      case 'battle_pass_theme':
        const themeSystemPrompt = `You are a creative game designer specializing in battle pass themes. Generate a complete theme concept including:
        - Theme name
        - Visual style description
        - Sample reward names (5-10 items)
        - Color scheme suggestions
        - Lore/story background
        Format as JSON with keys: name, description, rewards, colors, lore`;
        
        const themeResult = await askAI({
          prompt: `Create a battle pass theme based on: ${prompt}`,
          systemPrompt: themeSystemPrompt,
          model: 'gpt-4.1-mini',
          files: []
        });

        return NextResponse.json({
          success: true,
          data: {
            type,
            prompt,
            result: themeResult,
            context,
            generatedAt: new Date().toISOString()
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid AI generation type' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in AI generation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 
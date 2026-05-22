'use client';
import { TemplateId } from '@/lib/types';
import { TemplateProps } from './templates/shared';
import TemplateCentered from './templates/TemplateCentered';
import TemplateImpact    from './templates/TemplateImpact';
import TemplateSplit     from './templates/TemplateSplit';
import TemplateMinimal   from './templates/TemplateMinimal';
import TemplateCafe      from './templates/TemplateCafe';
import TemplatePromo     from './templates/TemplatePromo';
import TemplateEditorial from './templates/TemplateEditorial';
import TemplateNeon      from './templates/TemplateNeon';

const TEMPLATES: Record<TemplateId, React.ComponentType<TemplateProps>> = {
  centered:  TemplateCentered,
  impact:    TemplateImpact,
  split:     TemplateSplit,
  minimal:   TemplateMinimal,
  cafe:      TemplateCafe,
  promo:     TemplatePromo,
  editorial: TemplateEditorial,
  neon:      TemplateNeon,
};

interface PosterPreviewProps extends TemplateProps {
  templateId?: TemplateId;
}

export default function PosterPreview({ templateId = 'centered', ...props }: PosterPreviewProps) {
  const Template = TEMPLATES[templateId] ?? TemplateCentered;
  return <Template {...props} />;
}

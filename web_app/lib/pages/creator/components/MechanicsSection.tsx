import { MechanicsSectionProps } from "../../../config";
import { renderMechanicCard, getTextStyles, getSectionStyles, getGridStyles } from "./ui/ui";

export default function MechanicsSection({ props }: { props: MechanicsSectionProps }) {
  if (!props) {
    console.error('MechanicsSection: props is undefined');
    return null;
  }
  
  const { state, handlers } = props;
  
  return (
    <section className={getSectionStyles()}>
      <div className="text-center mb-12">
        <h2 className={getTextStyles('heading')}>
          Choose Your Game Mechanic
        </h2>
        <p className={`${getTextStyles('body')} mt-4`}>
          Select a game mechanic to generate its database schema and implementation code
        </p>
      </div>
      
      <div className={getGridStyles(3)}>
        {state.mechanics.map((mechanic) => 
          renderMechanicCard(
            mechanic,
            state.selectedMechanic === mechanic.id,
            () => handlers?.onMechanicSelect(mechanic.id)
          )
        )}
      </div>
    </section>
  );
} 